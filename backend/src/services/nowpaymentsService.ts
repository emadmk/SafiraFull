import axios from 'axios';
import { config } from '../config/env';

const NOWPAYMENTS_API_URL = config.nowPayments.sandbox
  ? 'https://api-sandbox.nowpayments.io/v1'
  : 'https://api.nowpayments.io/v1';

const apiClient = axios.create({
  baseURL: NOWPAYMENTS_API_URL,
  headers: {
    'x-api-key': config.nowPayments.apiKey,
    'Content-Type': 'application/json',
  },
});

interface CreatePaymentParams {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description?: string;
  ipn_callback_url?: string;
  case?: string; // For sandbox testing
}

interface PaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  price_amount: number;
  price_currency: string;
  order_id: string;
  order_description?: string;
  payment_url?: string;
  invoice_url?: string;
  created_at: string;
  updated_at: string;
}

interface PaymentStatusResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  price_amount: number;
  price_currency: string;
  order_id: string;
  actually_paid?: number;
  purchase_id?: string;
  outcome_amount?: number;
  outcome_currency?: string;
}

export class NOWPaymentsService {
  static async getAvailableCurrencies(): Promise<string[]> {
    try {
      const response = await apiClient.get('/currencies');
      return response.data.currencies;
    } catch (error: any) {
      console.error('Error fetching currencies:', error.response?.data || error.message);
      throw new Error('Failed to fetch available currencies');
    }
  }

  static async getMinimumAmount(currency: string): Promise<number> {
    try {
      const response = await apiClient.get(`/min-amount?currency_from=usd&currency_to=${currency}`);
      return response.data.min_amount;
    } catch (error: any) {
      console.error('Error fetching minimum amount:', error.response?.data || error.message);
      throw new Error('Failed to fetch minimum amount');
    }
  }

  static async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    try {
      const ipnCallbackUrl = params.ipn_callback_url || `${config.urls.backend}/api/payments/ipn`;

      const response = await apiClient.post('/payment', {
        ...params,
        ipn_callback_url: ipnCallbackUrl,
      });

      return response.data;
    } catch (error: any) {
      console.error('Error creating payment:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create payment');
    }
  }

  static async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await apiClient.get(`/payment/${paymentId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching payment status:', error.response?.data || error.message);
      throw new Error('Failed to fetch payment status');
    }
  }

  static async getPaymentsByOrderId(orderId: string): Promise<any[]> {
    try {
      const response = await apiClient.get(`/payment/?order_id=${orderId}`);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error fetching payments by order ID:', error.response?.data || error.message);
      return [];
    }
  }

  static verifyIpnSignature(signature: string, payload: string): boolean {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', config.nowPayments.ipnSecret);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');
    return signature === calculatedSignature;
  }

  static isPaymentCompleted(status: string): boolean {
    return ['finished', 'confirmed'].includes(status);
  }

  static isPaymentPending(status: string): boolean {
    return ['waiting', 'confirming', 'sending'].includes(status);
  }

  static isPaymentFailed(status: string): boolean {
    return ['failed', 'refunded', 'expired'].includes(status);
  }
}
