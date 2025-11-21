import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { CollectionModel } from '../models/Collection';
import { ReservationModel } from '../models/Reservation';
import { AppError } from '../middlewares/errorHandler';

export class CollectionController {
  static async getAll(req: Request, res: Response) {
    try {
      const activeOnly = req.query.active === 'true';
      const collections = await CollectionModel.getAll(activeOnly);

      res.json({
        success: true,
        data: collections,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const collection = await CollectionModel.findById(parseInt(id));

      if (!collection) {
        throw new AppError('Collection not found', 404);
      }

      res.json({
        success: true,
        data: collection,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async getAvailablePieces(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const collection = await CollectionModel.findById(parseInt(id));

      if (!collection) {
        throw new AppError('Collection not found', 404);
      }

      const availablePieces = await ReservationModel.getAvailablePieces(parseInt(id));

      res.json({
        success: true,
        data: {
          collection_id: collection.id,
          total_pieces: collection.total_pieces,
          available_count: availablePieces.length,
          available_pieces: availablePieces,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
