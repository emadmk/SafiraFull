import { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/profile', (req, res, next) => UserController.getProfile(req, res).catch(next));

router.put(
  '/profile',
  validate([
    body('full_name').optional().notEmpty().withMessage('Full name cannot be empty'),
  ]),
  (req, res, next) => UserController.updateProfile(req, res).catch(next)
);

router.get('/reservations', (req, res, next) => UserController.getReservations(req, res).catch(next));

router.get('/payments', (req, res, next) => UserController.getPayments(req, res).catch(next));

router.put(
  '/reservations/:id/address',
  validate([
    body('address').notEmpty().withMessage('Address is required'),
  ]),
  (req, res, next) => UserController.updateReservationAddress(req, res).catch(next)
);

router.use(errorHandler);

export default router;
