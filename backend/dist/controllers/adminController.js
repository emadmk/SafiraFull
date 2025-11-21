"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const Collection_1 = require("../models/Collection");
const User_1 = require("../models/User");
const Reservation_1 = require("../models/Reservation");
const Payment_1 = require("../models/Payment");
const Setting_1 = require("../models/Setting");
const errorHandler_1 = require("../middlewares/errorHandler");
class AdminController {
    // Collection Management
    static async createCollection(req, res) {
        try {
            const { name, description, image_url, price_usdt, total_pieces, delivery_date } = req.body;
            const collection = await Collection_1.CollectionModel.create({
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async updateCollection(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const collection = await Collection_1.CollectionModel.update(parseInt(id), updateData);
            res.json({
                success: true,
                message: 'Collection updated successfully',
                data: collection,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async deleteCollection(req, res) {
        try {
            const { id } = req.params;
            await Collection_1.CollectionModel.delete(parseInt(id));
            res.json({
                success: true,
                message: 'Collection deleted successfully',
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    // User Management
    static async getUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const { users, total } = await User_1.UserModel.getAll(page, limit);
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    // Reservations Management
    static async getReservations(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const { reservations, total } = await Reservation_1.ReservationModel.getAll(page, limit);
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async updateReservationStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const reservation = await Reservation_1.ReservationModel.updateStatus(parseInt(id), status);
            res.json({
                success: true,
                message: 'Reservation status updated successfully',
                data: reservation,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    // Payments Management
    static async getPayments(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const { payments, total } = await Payment_1.PaymentModel.getAll(page, limit);
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    // Analytics & Dashboard
    static async getDashboard(req, res) {
        try {
            const [totalUsers, collections, reservationStatusCounts, paymentStatusCounts, totalRevenue,] = await Promise.all([
                User_1.UserModel.getTotalCount(),
                Collection_1.CollectionModel.getAll(),
                Reservation_1.ReservationModel.getStatusCounts(),
                Payment_1.PaymentModel.getStatusCounts(),
                Payment_1.PaymentModel.getTotalRevenue(),
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
                        total: Object.values(reservationStatusCounts).reduce((sum, count) => sum + count, 0),
                        byStatus: reservationStatusCounts,
                    },
                    payments: {
                        total: Object.values(paymentStatusCounts).reduce((sum, count) => sum + count, 0),
                        byStatus: paymentStatusCounts,
                        totalRevenue,
                    },
                },
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    // Settings Management
    static async getSettings(req, res) {
        try {
            const settings = await Setting_1.SettingModel.getAll();
            res.json({
                success: true,
                data: settings,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async updateSetting(req, res) {
        try {
            const { key, value } = req.body;
            const setting = await Setting_1.SettingModel.set(key, value);
            res.json({
                success: true,
                message: 'Setting updated successfully',
                data: setting,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
}
exports.AdminController = AdminController;
