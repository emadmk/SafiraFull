"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const Payment_1 = require("../models/Payment");
const Reservation_1 = require("../models/Reservation");
const User_1 = require("../models/User");
const Collection_1 = require("../models/Collection");
const Setting_1 = require("../models/Setting");
const nowpaymentsService_1 = require("../services/nowpaymentsService");
const emailService_1 = require("../services/emailService");
const errorHandler_1 = require("../middlewares/errorHandler");
class PaymentController {
    static async createPayment(req, res) {
        try {
            const { reservation_id, currency } = req.body;
            // Check if payment gateway is enabled
            const gatewayEnabled = await Setting_1.SettingModel.get('payment_gateway_enabled');
            if (gatewayEnabled === 'false') {
                throw new errorHandler_1.AppError('Payment gateway is currently disabled', 503);
            }
            // Get reservation
            const reservation = await Reservation_1.ReservationModel.findById(reservation_id);
            if (!reservation) {
                throw new errorHandler_1.AppError('Reservation not found', 404);
            }
            // Check if user owns this reservation
            if (reservation.user_id !== req.user.userId) {
                throw new errorHandler_1.AppError('Unauthorized', 403);
            }
            // Check if reservation is already paid
            if (reservation.status === 'paid' || reservation.status === 'confirmed') {
                throw new errorHandler_1.AppError('Reservation is already paid', 400);
            }
            // Get collection for price
            const collection = await Collection_1.CollectionModel.findById(reservation.collection_id);
            if (!collection) {
                throw new errorHandler_1.AppError('Collection not found', 404);
            }
            // Use collection price
            const amount = collection.price_usdt;
            // Generate unique order ID
            const orderId = `ORDER-${Date.now()}-${reservation.id}`;
            // Create invoice in NOWPayments (allows customer to select currency)
            const invoiceParams = {
                price_amount: amount,
                price_currency: 'usd',
                order_id: orderId,
                order_description: `Reservation for ${collection.name} - Piece #${reservation.piece_number}`,
            };
            const nowInvoice = await nowpaymentsService_1.NOWPaymentsService.createInvoice(invoiceParams);
            // Save payment to database
            const payment = await Payment_1.PaymentModel.create({
                reservation_id,
                user_id: req.user.userId,
                order_id: orderId,
                amount_usdt: amount,
                currency: currency || 'multi', // Will be updated when customer selects
            });
            // Update payment with NOWPayments invoice data
            const invoiceUrl = nowInvoice.invoice_url;
            await Payment_1.PaymentModel.update(payment.id, {
                payment_id: nowInvoice.id,
                status: 'waiting',
                payment_url: invoiceUrl,
                nowpayments_data: nowInvoice,
            });
            res.status(201).json({
                success: true,
                message: 'Payment invoice created successfully',
                data: {
                    payment_id: nowInvoice.id,
                    order_id: orderId,
                    amount: amount,
                    currency: 'multi',
                    payment_url: invoiceUrl,
                    status: 'waiting',
                },
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getPaymentStatus(req, res) {
        try {
            const { payment_id } = req.params;
            const payment = await Payment_1.PaymentModel.findByPaymentId(payment_id);
            if (!payment) {
                throw new errorHandler_1.AppError('Payment not found', 404);
            }
            // Check if user owns this payment (unless admin)
            if (req.user.role !== 'admin' && payment.user_id !== req.user.userId) {
                throw new errorHandler_1.AppError('Unauthorized', 403);
            }
            // Get latest status from NOWPayments
            try {
                const nowPaymentStatus = await nowpaymentsService_1.NOWPaymentsService.getPaymentStatus(payment_id);
                // Update payment status if changed
                if (nowPaymentStatus.payment_status !== payment.status) {
                    await Payment_1.PaymentModel.update(payment.id, {
                        status: nowPaymentStatus.payment_status,
                        nowpayments_data: nowPaymentStatus,
                    });
                    // Update reservation status if payment is completed
                    if (nowpaymentsService_1.NOWPaymentsService.isPaymentCompleted(nowPaymentStatus.payment_status)) {
                        await Reservation_1.ReservationModel.updateStatus(payment.reservation_id, 'paid');
                    }
                }
                res.json({
                    success: true,
                    data: {
                        ...payment,
                        status: nowPaymentStatus.payment_status,
                        actually_paid: nowPaymentStatus.actually_paid,
                    },
                });
            }
            catch (error) {
                // If NOWPayments API fails, return stored payment data
                res.json({
                    success: true,
                    data: payment,
                });
            }
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async submitTxid(req, res) {
        try {
            const { payment_id, txid } = req.body;
            const payment = await Payment_1.PaymentModel.findByPaymentId(payment_id);
            if (!payment) {
                throw new errorHandler_1.AppError('Payment not found', 404);
            }
            // Check if user owns this payment
            if (payment.user_id !== req.user.userId) {
                throw new errorHandler_1.AppError('Unauthorized', 403);
            }
            // Update payment with TXID
            await Payment_1.PaymentModel.update(payment.id, { txid });
            res.json({
                success: true,
                message: 'Transaction ID submitted successfully',
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async handleIPN(req, res) {
        try {
            const signature = req.headers['x-nowpayments-sig'];
            const payload = JSON.stringify(req.body);
            // Verify IPN signature
            if (!nowpaymentsService_1.NOWPaymentsService.verifyIpnSignature(signature, payload)) {
                console.error('Invalid IPN signature');
                return res.status(400).json({ success: false, error: 'Invalid signature' });
            }
            const { payment_id, payment_status, order_id, actually_paid, outcome_amount, } = req.body;
            // Find payment by order ID or payment ID
            let payment = await Payment_1.PaymentModel.findByOrderId(order_id);
            if (!payment) {
                payment = await Payment_1.PaymentModel.findByPaymentId(payment_id);
            }
            if (!payment) {
                console.error('Payment not found for IPN:', order_id, payment_id);
                return res.status(404).json({ success: false, error: 'Payment not found' });
            }
            // Update payment status
            await Payment_1.PaymentModel.update(payment.id, {
                status: payment_status,
                nowpayments_data: req.body,
            });
            // If payment is completed, update reservation
            if (nowpaymentsService_1.NOWPaymentsService.isPaymentCompleted(payment_status)) {
                await Reservation_1.ReservationModel.updateStatus(payment.reservation_id, 'paid');
                // Send confirmation email
                const user = await User_1.UserModel.findById(payment.user_id);
                if (user) {
                    await (0, emailService_1.sendPaymentConfirmationEmail)(user.email, user.full_name, payment.order_id, payment.amount_usdt, payment.txid || payment_id, user.id);
                }
            }
            console.log(`✅ IPN processed for payment ${payment_id}: ${payment_status}`);
            res.json({ success: true });
        }
        catch (error) {
            console.error('IPN Error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
exports.PaymentController = PaymentController;
