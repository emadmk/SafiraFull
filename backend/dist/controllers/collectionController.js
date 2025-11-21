"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const Collection_1 = require("../models/Collection");
const Reservation_1 = require("../models/Reservation");
const errorHandler_1 = require("../middlewares/errorHandler");
class CollectionController {
    static async getAll(req, res) {
        try {
            const activeOnly = req.query.active === 'true';
            const collections = await Collection_1.CollectionModel.getAll(activeOnly);
            res.json({
                success: true,
                data: collections,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const collection = await Collection_1.CollectionModel.findById(parseInt(id));
            if (!collection) {
                throw new errorHandler_1.AppError('Collection not found', 404);
            }
            res.json({
                success: true,
                data: collection,
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async getAvailablePieces(req, res) {
        try {
            const { id } = req.params;
            const collection = await Collection_1.CollectionModel.findById(parseInt(id));
            if (!collection) {
                throw new errorHandler_1.AppError('Collection not found', 404);
            }
            const availablePieces = await Reservation_1.ReservationModel.getAvailablePieces(parseInt(id));
            res.json({
                success: true,
                data: {
                    collection_id: collection.id,
                    total_pieces: collection.total_pieces,
                    available_count: availablePieces.length,
                    available_pieces: availablePieces,
                },
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
}
exports.CollectionController = CollectionController;
