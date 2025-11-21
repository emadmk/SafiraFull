"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const Reservation_1 = require("../models/Reservation");
const Collection_1 = require("../models/Collection");
const errorHandler_1 = require("../middlewares/errorHandler");
const emailService_1 = require("../services/emailService");
const User_1 = require("../models/User");
class ReservationController {
    static async create(req, res) {
        try {
            const { collection_id, piece_number, delivery_address } = req.body;
            // Check if collection exists and is active
            const collection = await Collection_1.CollectionModel.findById(collection_id);
            if (!collection) {
                throw new errorHandler_1.AppError('Collection not found', 404);
            }
            if (!collection.is_active) {
                throw new errorHandler_1.AppError('Collection is not active', 400);
            }
            // Check if piece is available
            if (collection.available_pieces <= 0) {
                throw new errorHandler_1.AppError('No pieces available in this collection', 400);
            }
            // Check if piece number is valid
            if (piece_number < 1 || piece_number > collection.total_pieces) {
                throw new errorHandler_1.AppError('Invalid piece number', 400);
            }
            // Check if piece is already taken
            const isTaken = await Reservation_1.ReservationModel.isPieceTaken(collection_id, piece_number);
            if (isTaken) {
                throw new errorHandler_1.AppError('This piece is already reserved', 400);
            }
            // Create reservation
            const reservation = await Reservation_1.ReservationModel.create({
                user_id: req.user.userId,
                collection_id,
                piece_number,
                delivery_address,
            });
            // Decrement available pieces
            await Collection_1.CollectionModel.decrementAvailablePieces(collection_id);
            // Send email
            const user = await User_1.UserModel.findById(req.user.userId);
            if (user) {
                await (0, emailService_1.sendReservationEmail)(user.email, user.full_name, collection.name, piece_number, user.id);
            }
            res.status(201).json({
                success: true,
                message: 'Reservation created successfully',
                data: reservation,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const reservation = await Reservation_1.ReservationModel.findById(parseInt(id));
            if (!reservation) {
                throw new errorHandler_1.AppError('Reservation not found', 404);
            }
            // Check if user owns this reservation (unless admin)
            if (req.user.role !== 'admin' && reservation.user_id !== req.user.userId) {
                throw new errorHandler_1.AppError('Unauthorized', 403);
            }
            res.json({
                success: true,
                data: reservation,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
}
exports.ReservationController = ReservationController;
