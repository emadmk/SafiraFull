import { Router } from 'express';
import { body } from 'express-validator';
import { ReservationController } from '../controllers/reservationController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post(
  '/',
  validate([
    body('collection_id').isInt().withMessage('Valid collection ID is required'),
    body('piece_number').isInt().withMessage('Valid piece number is required'),
  ]),
  (req, res, next) => ReservationController.create(req, res).catch(next)
);

router.get('/:id', (req, res, next) => ReservationController.getById(req, res).catch(next));

router.use(errorHandler);

export default router;
