import { pool } from '../config/database';
import { Reservation } from '../types';

export class ReservationModel {
  static async create(data: {
    user_id: number;
    collection_id: number;
    piece_number: number;
    delivery_address?: string;
  }): Promise<Reservation> {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, collection_id, piece_number, delivery_address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.user_id, data.collection_id, data.piece_number, data.delivery_address]
    );
    return result.rows[0];
  }

  static async findById(id: number): Promise<Reservation | null> {
    const result = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByUserId(userId: number): Promise<Reservation[]> {
    const result = await pool.query(
      `SELECT r.*, c.name as collection_name, c.image_url, c.delivery_date, c.price_usdt
       FROM reservations r
       JOIN collections c ON r.collection_id = c.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async findByCollectionId(collectionId: number): Promise<Reservation[]> {
    const result = await pool.query(
      'SELECT * FROM reservations WHERE collection_id = $1 ORDER BY piece_number ASC',
      [collectionId]
    );
    return result.rows;
  }

  static async updateStatus(id: number, status: string): Promise<Reservation> {
    const result = await pool.query(
      `UPDATE reservations
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }

  static async updateDeliveryAddress(id: number, address: string): Promise<Reservation> {
    const result = await pool.query(
      `UPDATE reservations
       SET delivery_address = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [address, id]
    );
    return result.rows[0];
  }

  static async getAll(page: number = 1, limit: number = 20): Promise<{ reservations: any[]; total: number }> {
    const offset = (page - 1) * limit;
    const [reservationsResult, countResult] = await Promise.all([
      pool.query(
        `SELECT r.*, u.email, u.full_name, c.name as collection_name, c.price_usdt
         FROM reservations r
         JOIN users u ON r.user_id = u.id
         JOIN collections c ON r.collection_id = c.id
         ORDER BY r.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query('SELECT COUNT(*) FROM reservations'),
    ]);
    return {
      reservations: reservationsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async isPieceTaken(collectionId: number, pieceNumber: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM reservations WHERE collection_id = $1 AND piece_number = $2',
      [collectionId, pieceNumber]
    );
    return result.rows.length > 0;
  }

  static async getAvailablePieces(collectionId: number): Promise<number[]> {
    const collection = await pool.query('SELECT total_pieces FROM collections WHERE id = $1', [collectionId]);
    if (collection.rows.length === 0) return [];

    const totalPieces = collection.rows[0].total_pieces;
    const reserved = await pool.query(
      'SELECT piece_number FROM reservations WHERE collection_id = $1',
      [collectionId]
    );

    const reservedNumbers = new Set(reserved.rows.map((r) => r.piece_number));
    const available: number[] = [];

    for (let i = 1; i <= totalPieces; i++) {
      if (!reservedNumbers.has(i)) {
        available.push(i);
      }
    }

    return available;
  }

  static async getStatusCounts(): Promise<Record<string, number>> {
    const result = await pool.query(
      `SELECT status, COUNT(*) as count
       FROM reservations
       GROUP BY status`
    );
    const counts: Record<string, number> = {};
    result.rows.forEach((row) => {
      counts[row.status] = parseInt(row.count);
    });
    return counts;
  }
}
