"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOWPaymentsService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const NOWPAYMENTS_API_URL = env_1.config.nowPayments.sandbox
    ? 'https://api-sandbox.nowpayments.io/v1'
    : 'https://api.nowpayments.io/v1';
const apiClient = axios_1.default.create({
    baseURL: NOWPAYMENTS_API_URL,
    headers: {
        'x-api-key': env_1.config.nowPayments.apiKey,
        'Content-Type': 'application/json',
    },
});
class NOWPaymentsService {
    static async getAvailableCurrencies() {
        try {
            const response = await apiClient.get('/currencies');
            return response.data.currencies;
        }
        catch (error) {
            console.error('Error fetching currencies:', error.response?.data || error.message);
            throw new Error('Failed to fetch available currencies');
        }
    }
    static async getMinimumAmount(currency) {
        try {
            const response = await apiClient.get(`/min-amount?currency_from=usd&currency_to=${currency}`);
            return response.data.min_amount;
        }
        catch (error) {
            console.error('Error fetching minimum amount:', error.response?.data || error.message);
            throw new Error('Failed to fetch minimum amount');
        }
    }
    static async createPayment(params) {
        try {
            const ipnCallbackUrl = params.ipn_callback_url || `${env_1.config.urls.backend}/api/payments/ipn`;
            const response = await apiClient.post('/payment', {
                ...params,
                ipn_callback_url: ipnCallbackUrl,
            });
            return response.data;
        }
        catch (error) {
            console.error('Error creating payment:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create payment');
        }
    }
    static async getPaymentStatus(paymentId) {
        try {
            const response = await apiClient.get(`/payment/${paymentId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching payment status:', error.response?.data || error.message);
            throw new Error('Failed to fetch payment status');
        }
    }
    static async getPaymentsByOrderId(orderId) {
        try {
            const response = await apiClient.get(`/payment/?order_id=${orderId}`);
            return response.data.data || [];
        }
        catch (error) {
            console.error('Error fetching payments by order ID:', error.response?.data || error.message);
            return [];
        }
    }
    static verifyIpnSignature(signature, payload) {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha512', env_1.config.nowPayments.ipnSecret);
        hmac.update(payload);
        const calculatedSignature = hmac.digest('hex');
        return signature === calculatedSignature;
    }
    static isPaymentCompleted(status) {
        return ['finished', 'confirmed'].includes(status);
    }
    static isPaymentPending(status) {
        return ['waiting', 'confirming', 'sending'].includes(status);
    }
    static isPaymentFailed(status) {
        return ['failed', 'refunded', 'expired'].includes(status);
    }
}
exports.NOWPaymentsService = NOWPaymentsService;
