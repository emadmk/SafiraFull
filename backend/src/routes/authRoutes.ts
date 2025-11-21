import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

router.post(
  '/register',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('full_name').notEmpty().withMessage('Full name is required'),
  ]),
  (req, res, next) => AuthController.register(req, res).catch(next)
);

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  (req, res, next) => AuthController.login(req, res).catch(next)
);

router.use(errorHandler);

export default router;
