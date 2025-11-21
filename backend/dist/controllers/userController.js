"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const Reservation_1 = require("../models/Reservation");
const Payment_1 = require("../models/Payment");
const errorHandler_1 = require("../middlewares/errorHandler");
class UserController {
    static async getProfile(req, res) {
        try {
            const user = await User_1.UserModel.findById(req.user.userId);
            if (!user) {
                throw new errorHandler_1.AppError('User not found', 404);
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async updateProfile(req, res) {
        try {
            const { full_name, phone, address } = req.body;
            const updatedUser = await User_1.UserModel.updateProfile(req.user.userId, {
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
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getReservations(req, res) {
        try {
            const reservations = await Reservation_1.ReservationModel.findByUserId(req.user.userId);
            res.json({
                success: true,
                data: reservations,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getPayments(req, res) {
        try {
            const payments = await Payment_1.PaymentModel.findByUserId(req.user.userId);
            res.json({
                success: true,
                data: payments,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async updateReservationAddress(req, res) {
        try {
            const { id } = req.params;
            const { address } = req.body;
            // Verify the reservation belongs to the user
            const reservation = await Reservation_1.ReservationModel.findById(parseInt(id));
            if (!reservation) {
                throw new errorHandler_1.AppError('Reservation not found', 404);
            }
            if (reservation.user_id !== req.user.userId) {
                throw new errorHandler_1.AppError('Unauthorized', 403);
            }
            const updatedReservation = await Reservation_1.ReservationModel.updateDeliveryAddress(parseInt(id), address);
            res.json({
                success: true,
                message: 'Delivery address updated successfully',
                data: updatedReservation,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
}
exports.UserController = UserController;
