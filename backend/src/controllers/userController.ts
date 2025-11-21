import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { UserModel } from '../models/User';
import { ReservationModel } from '../models/Reservation';
import { PaymentModel } from '../models/Payment';
import { AppError } from '../middlewares/errorHandler';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await UserModel.findById(req.user!.userId);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          address: user.address,
          role: user.role,
          created_at: user.created_at,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { full_name, phone, address } = req.body;

      const updatedUser = await UserModel.updateProfile(req.user!.userId, {
        full_name,
        phone,
        address,
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          full_name: updatedUser.full_name,
          phone: updatedUser.phone,
          address: updatedUser.address,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async getReservations(req: AuthRequest, res: Response) {
    try {
      const reservations = await ReservationModel.findByUserId(req.user!.userId);

      res.json({
        success: true,
        data: reservations,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async getPayments(req: AuthRequest, res: Response) {
    try {
      const payments = await PaymentModel.findByUserId(req.user!.userId);

      res.json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async updateReservationAddress(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { address } = req.body;

      // Verify the reservation belongs to the user
      const reservation = await ReservationModel.findById(parseInt(id));
      if (!reservation) {
        throw new AppError('Reservation not found', 404);
      }

      if (reservation.user_id !== req.user!.userId) {
        throw new AppError('Unauthorized', 403);
      }

      const updatedReservation = await ReservationModel.updateDeliveryAddress(
        parseInt(id),
        address
      );

      res.json({
        success: true,
        message: 'Delivery address updated successfully',
        data: updatedReservation,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
