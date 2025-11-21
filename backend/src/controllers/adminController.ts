import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { CollectionModel } from '../models/Collection';
import { UserModel } from '../models/User';
import { ReservationModel } from '../models/Reservation';
import { PaymentModel } from '../models/Payment';
import { SettingModel } from '../models/Setting';
import { AppError } from '../middlewares/errorHandler';

export class AdminController {
  // Collection Management
  static async createCollection(req: AuthRequest, res: Response) {
    try {
      const { name, description, image_url, price_usdt, total_pieces, delivery_date } = req.body;

      const collection = await CollectionModel.create({
        name,
        description,
        image_url,
        price_usdt,
        total_pieces,
        delivery_date,
      });

      res.status(201).json({
        success: true,
        message: 'Collection created successfully',
        data: collection,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async updateCollection(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const collection = await CollectionModel.update(parseInt(id), updateData);

      res.json({
        success: true,
        message: 'Collection updated successfully',
        data: collection,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async deleteCollection(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      await CollectionModel.delete(parseInt(id));

      res.json({
        success: true,
        message: 'Collection deleted successfully',
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  // User Management
  static async getUsers(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { users, total } = await UserModel.getAll(page, limit);

      res.json({
        success: true,
        data: {
          users: users.map(u => ({
            id: u.id,
            email: u.email,
            full_name: u.full_name,
            phone: u.phone,
            role: u.role,
            is_active: u.is_active,
            created_at: u.created_at,
          })),
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  // Reservations Management
  static async getReservations(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { reservations, total } = await ReservationModel.getAll(page, limit);

      res.json({
        success: true,
        data: {
          reservations,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async updateReservationStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const reservation = await ReservationModel.updateStatus(parseInt(id), status);

      res.json({
        success: true,
        message: 'Reservation status updated successfully',
        data: reservation,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  // Payments Management
  static async getPayments(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { payments, total } = await PaymentModel.getAll(page, limit);

      res.json({
        success: true,
        data: {
          payments,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  // Analytics & Dashboard
  static async getDashboard(req: AuthRequest, res: Response) {
    try {
      const [
        totalUsers,
        collections,
        reservationStatusCounts,
        paymentStatusCounts,
        totalRevenue,
      ] = await Promise.all([
        UserModel.getTotalCount(),
        CollectionModel.getAll(),
        ReservationModel.getStatusCounts(),
        PaymentModel.getStatusCounts(),
        PaymentModel.getTotalRevenue(),
      ]);

      // Calculate stats
      const totalCollections = collections.length;
      const totalPieces = collections.reduce((sum, c) => sum + c.total_pieces, 0);
      const availablePieces = collections.reduce((sum, c) => sum + c.available_pieces, 0);
      const soldPieces = collections.reduce((sum, c) => sum + c.sold_pieces, 0);

      res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
          },
          collections: {
            total: totalCollections,
            active: collections.filter(c => c.is_active).length,
          },
          pieces: {
            total: totalPieces,
            available: availablePieces,
            sold: soldPieces,
          },
          reservations: {
            total: Object.values(reservationStatusCounts).reduce((sum: number, count: number) => sum + count, 0),
            byStatus: reservationStatusCounts,
          },
          payments: {
            total: Object.values(paymentStatusCounts).reduce((sum: number, count: number) => sum + count, 0),
            byStatus: paymentStatusCounts,
            totalRevenue,
          },
        },
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  // Settings Management
  static async getSettings(req: AuthRequest, res: Response) {
    try {
      const settings = await SettingModel.getAll();

      res.json({
        success: true,
        data: settings,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

  static async updateSetting(req: AuthRequest, res: Response) {
    try {
      const { key, value } = req.body;

      const setting = await SettingModel.set(key, value);

      res.json({
        success: true,
        message: 'Setting updated successfully',
        data: setting,
      });
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
