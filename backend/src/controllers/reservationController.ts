import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { ReservationModel } from '../models/Reservation';
import { CollectionModel } from '../models/Collection';
import { AppError } from '../middlewares/errorHandler';
import { sendReservationEmail } from '../services/emailService';
import { UserModel } from '../models/User';

export class ReservationController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { collection_id, piece_number, delivery_address } = req.body;

      // Check if collection exists and is active
      const collection = await CollectionModel.findById(collection_id);
      if (!collection) {
        throw new AppError('Collection not found', 404);
      }

      if (!collection.is_active) {
        throw new AppError('Collection is not active', 400);
      }

      // Check if piece is available
      if (collection.available_pieces <= 0) {
        throw new AppError('No pieces available in this collection', 400);
      }

      // Check if piece number is valid
      if (piece_number < 1 || piece_number > collection.total_pieces) {
        throw new AppError('Invalid piece number', 400);
      }

      // Check if piece is already taken
      const isTaken = await ReservationModel.isPieceTaken(collection_id, piece_number);
      if (isTaken) {
        throw new AppError('This piece is already reserved', 400);
      }

      // Create reservation
      const reservation = await ReservationModel.create({
        user_id: req.user!.userId,
        collection_id,
        piece_number,
        delivery_address,
      });

      // Decrement available pieces
      await CollectionModel.decrementAvailablePieces(collection_id);

      // Send email
      const user = await UserModel.findById(req.user!.userId);
      if (user) {
        await sendReservationEmail(
          user.email,
          user.full_name,
          collection.name,
          piece_number,
          user.id
        );
      }

      res.status(201).json({
        success: true,
        message: 'Reservation created successfully',
        data: reservation,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const reservation = await ReservationModel.findById(parseInt(id));

      if (!reservation) {
        throw new AppError('Reservation not found', 404);
      }

      // Check if user owns this reservation (unless admin)
      if (req.user!.role !== 'admin' && reservation.user_id !== req.user!.userId) {
        throw new AppError('Unauthorized', 403);
      }

      res.json({
        success: true,
        data: reservation,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
