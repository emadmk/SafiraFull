import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendWelcomeEmail } from '../services/emailService';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, full_name, phone } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        throw new AppError('Email already registered', 400);
      }

      // Create user
      const user = await UserModel.create(email, password, full_name, phone);

      // Generate token
      const token = generateToken(user.id, user.email, user.role);

      // Send welcome email
      await sendWelcomeEmail(user.email, user.full_name, user.id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            role: user.role,
          },
          token,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      // Check if user is active
      if (!user.is_active) {
        throw new AppError('Account is deactivated', 403);
      }

      // Verify password
      const isPasswordValid = await UserModel.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
      }

      // Generate token
      const token = generateToken(user.id, user.email, user.role);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            address: user.address,
            role: user.role,
          },
          token,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
