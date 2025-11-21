"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModel = void 0;
const database_1 = require("../config/database");
class ReservationModel {
    static async create(data) {
        const result = await database_1.pool.query(`INSERT INTO reservations (user_id, collection_id, piece_number, delivery_address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [data.user_id, data.collection_id, data.piece_number, data.delivery_address]);
        return result.rows[0];
    }
    static async findById(id) {
        const result = await database_1.pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    static async findByUserId(userId) {
        const result = await database_1.pool.query(`SELECT r.*, c.name as collection_name, c.image_url, c.delivery_date, c.price_usdt
       FROM reservations r
       JOIN collections c ON r.collection_id = c.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`, [userId]);
        return result.rows;
    }
    static async findByCollectionId(collectionId) {
        const result = await database_1.pool.query('SELECT * FROM reservations WHERE collection_id = $1 ORDER BY piece_number ASC', [collectionId]);
        return result.rows;
    }
    static async updateStatus(id, status) {
        const result = await database_1.pool.query(`UPDATE reservations
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`, [status, id]);
        return result.rows[0];
    }
    static async updateDeliveryAddress(id, address) {
        const result = await database_1.pool.query(`UPDATE reservations
       SET delivery_address = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`, [address, id]);
        return result.rows[0];
    }
    static async getAll(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const [reservationsResult, countResult] = await Promise.all([
            database_1.pool.query(`SELECT r.*, u.email, u.full_name, c.name as collection_name, c.price_usdt
         FROM reservations r
         JOIN users u ON r.user_id = u.id
         JOIN collections c ON r.collection_id = c.id
         ORDER BY r.created_at DESC
         LIMIT $1 OFFSET $2`, [limit, offset]),
            database_1.pool.query('SELECT COUNT(*) FROM reservations'),
        ]);
        return {
            reservations: reservationsResult.rows,
            total: parseInt(countResult.rows[0].count),
        };
    }
    static async isPieceTaken(collectionId, pieceNumber) {
        const result = await database_1.pool.query('SELECT id FROM reservations WHERE collection_id = $1 AND piece_number = $2', [collectionId, pieceNumber]);
        return result.rows.length > 0;
    }
    static async getAvailablePieces(collectionId) {
        const collection = await database_1.pool.query('SELECT total_pieces FROM collections WHERE id = $1', [collectionId]);
        if (collection.rows.length === 0)
            return [];
        const totalPieces = collection.rows[0].total_pieces;
        const reserved = await database_1.pool.query('SELECT piece_number FROM reservations WHERE collection_id = $1', [collectionId]);
        const reservedNumbers = new Set(reserved.rows.map((r) => r.piece_number));
        const available = [];
        for (let i = 1; i <= totalPieces; i++) {
            if (!reservedNumbers.has(i)) {
                available.push(i);
            }
        }
        return available;
    }
    static async getStatusCounts() {
        const result = await database_1.pool.query(`SELECT status, COUNT(*) as count
       FROM reservations
       GROUP BY status`);
        const counts = {};
        result.rows.forEach((row) => {
            counts[row.status] = parseInt(row.count);
        });
        return counts;
    }
}
exports.ReservationModel = ReservationModel;
