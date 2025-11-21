import { Router } from 'express';
import { body } from 'express-validator';
import { AdminController } from '../controllers/adminController';
import { authenticate, isAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// Dashboard
router.get('/dashboard', (req, res, next) => AdminController.getDashboard(req, res).catch(next));

// Collections
router.post(
  '/collections',
  validate([
    body('name').notEmpty().withMessage('Collection name is required'),
    body('price_usdt').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('total_pieces').isInt({ min: 1 }).withMessage('Total pieces must be at least 1'),
  ]),
  (req, res, next) => AdminController.createCollection(req, res).catch(next)
);

router.put('/collections/:id', (req, res, next) =>
  AdminController.updateCollection(req, res).catch(next)
);

router.delete('/collections/:id', (req, res, next) =>
  AdminController.deleteCollection(req, res).catch(next)
);

// Users
router.get('/users', (req, res, next) => AdminController.getUsers(req, res).catch(next));

// Reservations
router.get('/reservations', (req, res, next) =>
  AdminController.getReservations(req, res).catch(next)
);

router.put(
  '/reservations/:id/status',
  validate([
    body('status').notEmpty().withMessage('Status is required'),
  ]),
  (req, res, next) => AdminController.updateReservationStatus(req, res).catch(next)
);

// Payments
router.get('/payments', (req, res, next) => AdminController.getPayments(req, res).catch(next));

// Settings
router.get('/settings', (req, res, next) => AdminController.getSettings(req, res).catch(next));

router.put(
  '/settings',
  validate([
    body('key').notEmpty().withMessage('Setting key is required'),
    body('value').notEmpty().withMessage('Setting value is required'),
  ]),
  (req, res, next) => AdminController.updateSetting(req, res).catch(next)
);

router.use(errorHandler);

export default router;
