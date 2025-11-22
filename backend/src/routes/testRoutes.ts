import { Router, Request, Response } from 'express';
import { NOWPaymentsService } from '../services/nowpaymentsService';
import { config } from '../config/env';
import axios from 'axios';

const router = Router();

// Test NOWPayments API connection
router.get('/nowpayments/status', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.nowpayments.io/v1/status', {
      headers: {
        'x-api-key': config.nowPayments.apiKey,
      },
    });

    res.json({
      success: true,
      data: response.data,
      config: {
        sandbox: config.nowPayments.sandbox,
        hasApiKey: !!config.nowPayments.apiKey,
        apiKeyPrefix: config.nowPayments.apiKey.substring(0, 10) + '...',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Test available currencies
router.get('/nowpayments/currencies', async (req: Request, res: Response) => {
  try {
    const currencies = await NOWPaymentsService.getAvailableCurrencies();

    const hasUSDT = currencies.includes('usdttrc20');
    const hasTRX = currencies.includes('trx');

    res.json({
      success: true,
      data: {
        total: currencies.length,
        hasUSDTTRC20: hasUSDT,
        hasTRX: hasTRX,
        usdtVariants: currencies.filter(c => c.includes('usdt')),
        allCurrencies: currencies,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Test merchant whitelisted currencies
router.get('/nowpayments/merchant-coins', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.nowpayments.io/v1/merchant/coins', {
      headers: {
        'x-api-key': config.nowPayments.apiKey,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Test creating a minimum payment estimate
router.get('/nowpayments/estimate', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.nowpayments.io/v1/estimate', {
      headers: {
        'x-api-key': config.nowPayments.apiKey,
      },
      params: {
        amount: 100,
        currency_from: 'usd',
        currency_to: 'usdttrc20',
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Test minimum payment amount
router.get('/nowpayments/min-amount', async (req: Request, res: Response) => {
  try {
    const currency = req.query.currency || 'usdttrc20';
    const response = await axios.get(`https://api.nowpayments.io/v1/min-amount`, {
      headers: {
        'x-api-key': config.nowPayments.apiKey,
      },
      params: {
        currency_from: 'usd',
        currency_to: currency,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Check minimum amounts for multiple currencies
router.get('/nowpayments/check-minimums', async (req: Request, res: Response) => {
  try {
    const currencies = ['usdttrc20', 'trx', 'btc', 'eth', 'usdterc20'];
    const results: any = {};

    for (const currency of currencies) {
      try {
        const response = await axios.get(`https://api.nowpayments.io/v1/min-amount`, {
          headers: {
            'x-api-key': config.nowPayments.apiKey,
          },
          params: {
            currency_from: 'usd',
            currency_to: currency,
          },
        });
        results[currency] = {
          min_amount: response.data.min_amount,
          fiat_equivalent: response.data.fiat_equivalent,
        };
      } catch (error: any) {
        results[currency] = { error: error.response?.data?.message || error.message };
      }
    }

    res.json({
      success: true,
      data: results,
      note: 'These are minimum payment amounts in USD for each currency',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Test creating an invoice
router.post('/nowpayments/test-invoice', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'https://api.nowpayments.io/v1/invoice',
      {
        price_amount: 10,
        price_currency: 'usd',
        order_id: `TEST-${Date.now()}`,
        order_description: 'Test Invoice for Currency Selection',
        success_url: `${config.urls.frontend}/dashboard`,
        cancel_url: `${config.urls.frontend}/reserve`,
        ipn_callback_url: `${config.urls.backend}/api/payments/ipn`,
      },
      {
        headers: {
          'x-api-key': config.nowPayments.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
      message: 'Open invoice_url in browser to see currency selection',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

export default router;
