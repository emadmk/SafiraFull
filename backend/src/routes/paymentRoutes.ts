import { Router } from 'express';
import { body } from 'express-validator';
import { PaymentController } from '../controllers/paymentController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

// IPN webhook (no authentication)
router.post('/ipn', (req, res, next) => PaymentController.handleIPN(req, res).catch(next));

// All other routes require authentication
router.use(authenticate);

router.post(
  '/',
  validate([
    body('reservation_id').isInt().withMessage('Valid reservation ID is required'),
    body('currency').optional().isString().withMessage('Currency must be a string'),
  ]),
  (req, res, next) => PaymentController.createPayment(req, res).catch(next)
);

router.get('/:payment_id/status', (req, res, next) =>
  PaymentController.getPaymentStatus(req, res).catch(next)
);

router.post(
  '/submit-txid',
  validate([
    body('payment_id').notEmpty().withMessage('Payment ID is required'),
    body('txid').notEmpty().withMessage('Transaction ID is required'),
  ]),
  (req, res, next) => PaymentController.submitTxid(req, res).catch(next)
);

router.use(errorHandler);

export default router;
