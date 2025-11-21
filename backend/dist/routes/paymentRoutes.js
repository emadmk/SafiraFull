"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const paymentController_1 = require("../controllers/paymentController");
const auth_1 = require("../middlewares/auth");
const validator_1 = require("../middlewares/validator");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
// IPN webhook (no authentication)
router.post('/ipn', (req, res, next) => paymentController_1.PaymentController.handleIPN(req, res).catch(next));
// All other routes require authentication
router.use(auth_1.authenticate);
router.post('/', (0, validator_1.validate)([
    (0, express_validator_1.body)('reservation_id').isInt().withMessage('Valid reservation ID is required'),
    (0, express_validator_1.body)('currency').optional().isString().withMessage('Currency must be a string'),
]), (req, res, next) => paymentController_1.PaymentController.createPayment(req, res).catch(next));
router.get('/:payment_id/status', (req, res, next) => paymentController_1.PaymentController.getPaymentStatus(req, res).catch(next));
router.post('/submit-txid', (0, validator_1.validate)([
    (0, express_validator_1.body)('payment_id').notEmpty().withMessage('Payment ID is required'),
    (0, express_validator_1.body)('txid').notEmpty().withMessage('Transaction ID is required'),
]), (req, res, next) => paymentController_1.PaymentController.submitTxid(req, res).catch(next));
router.use(errorHandler_1.errorHandler);
exports.default = router;
