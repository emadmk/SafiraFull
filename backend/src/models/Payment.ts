import { pool } from '../config/database';
import { Payment } from '../types';

export class PaymentModel {
  static async create(data: {
    reservation_id: number;
    user_id: number;
    order_id: string;
    amount_usdt: number;
    currency?: string;
  }): Promise<Payment> {
    const result = await pool.query(
      `INSERT INTO payments (reservation_id, user_id, order_id, amount_usdt, currency)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.reservation_id, data.user_id, data.order_id, data.amount_usdt, data.currency || 'USDT']
    );
    return result.rows[0];
  }

  static async findById(id: number): Promise<Payment | null> {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByOrderId(orderId: string): Promise<Payment | null> {
    const result = await pool.query('SELECT * FROM payments WHERE order_id = $1', [orderId]);
    return result.rows[0] || null;
  }

  static async findByPaymentId(paymentId: string): Promise<Payment | null> {
    const result = await pool.query('SELECT * FROM payments WHERE payment_id = $1', [paymentId]);
    return result.rows[0] || null;
  }

  static async findByUserId(userId: number): Promise<Payment[]> {
    const result = await pool.query(
      `SELECT p.*, r.collection_id, r.piece_number, c.name as collection_name
       FROM payments p
       LEFT JOIN reservations r ON p.reservation_id = r.id
       LEFT JOIN collections c ON r.collection_id = c.id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async update(id: number, data: Partial<Payment>): Promise<Payment> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.payment_id !== undefined) {
      fields.push(`payment_id = $${paramCount++}`);
      values.push(data.payment_id);
    }
    if (data.status) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.txid !== undefined) {
      fields.push(`txid = $${paramCount++}`);
      values.push(data.txid);
    }
    if (data.payment_url !== undefined) {
      fields.push(`payment_url = $${paramCount++}`);
      values.push(data.payment_url);
    }
    if (data.nowpayments_data !== undefined) {
      fields.push(`nowpayments_data = $${paramCount++}`);
      values.push(JSON.stringify(data.nowpayments_data));
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE payments SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async getAll(page: number = 1, limit: number = 20): Promise<{ payments: any[]; total: number }> {
    const offset = (page - 1) * limit;
    const [paymentsResult, countResult] = await Promise.all([
      pool.query(
        `SELECT p.*, u.email, u.full_name, r.collection_id, r.piece_number, c.name as collection_name
         FROM payments p
         JOIN users u ON p.user_id = u.id
         LEFT JOIN reservations r ON p.reservation_id = r.id
         LEFT JOIN collections c ON r.collection_id = c.id
         ORDER BY p.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query('SELECT COUNT(*) FROM payments'),
    ]);
    return {
      payments: paymentsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async getStatusCounts(): Promise<Record<string, number>> {
    const result = await pool.query(
      `SELECT status, COUNT(*) as count
       FROM payments
       GROUP BY status`
    );
    const counts: Record<string, number> = {};
    result.rows.forEach((row) => {
      counts[row.status] = parseInt(row.count);
    });
    return counts;
  }

  static async getTotalRevenue(): Promise<number> {
    const result = await pool.query(
      `SELECT SUM(amount_usdt) as total
       FROM payments
       WHERE status IN ('finished', 'confirmed')`
    );
    return parseFloat(result.rows[0].total) || 0;
  }
}
