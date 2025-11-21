import { pool } from '../config/database';
import { Collection } from '../types';

export class CollectionModel {
  static async create(data: {
    name: string;
    description?: string;
    image_url?: string;
    price_usdt: number;
    total_pieces: number;
    delivery_date?: Date;
  }): Promise<Collection> {
    const result = await pool.query(
      `INSERT INTO collections (name, description, image_url, price_usdt, total_pieces, available_pieces, delivery_date)
       VALUES ($1, $2, $3, $4, $5, $5, $6)
       RETURNING *`,
      [
        data.name,
        data.description,
        data.image_url,
        data.price_usdt,
        data.total_pieces,
        data.delivery_date,
      ]
    );
    return result.rows[0];
  }

  static async findById(id: number): Promise<Collection | null> {
    const result = await pool.query('SELECT * FROM collections WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async getAll(activeOnly: boolean = false): Promise<Collection[]> {
    const query = activeOnly
      ? 'SELECT * FROM collections WHERE is_active = true ORDER BY created_at DESC'
      : 'SELECT * FROM collections ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async update(id: number, data: Partial<Collection>): Promise<Collection> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.image_url !== undefined) {
      fields.push(`image_url = $${paramCount++}`);
      values.push(data.image_url);
    }
    if (data.price_usdt) {
      fields.push(`price_usdt = $${paramCount++}`);
      values.push(data.price_usdt);
    }
    if (data.total_pieces) {
      fields.push(`total_pieces = $${paramCount++}`);
      values.push(data.total_pieces);
    }
    if (data.available_pieces !== undefined) {
      fields.push(`available_pieces = $${paramCount++}`);
      values.push(data.available_pieces);
    }
    if (data.sold_pieces !== undefined) {
      fields.push(`sold_pieces = $${paramCount++}`);
      values.push(data.sold_pieces);
    }
    if (data.delivery_date !== undefined) {
      fields.push(`delivery_date = $${paramCount++}`);
      values.push(data.delivery_date);
    }
    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramCount++}`);
      values.push(data.is_active);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE collections SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async decrementAvailablePieces(id: number): Promise<void> {
    await pool.query(
      `UPDATE collections
       SET available_pieces = available_pieces - 1,
           sold_pieces = sold_pieces + 1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [id]
    );
  }

  static async incrementAvailablePieces(id: number): Promise<void> {
    await pool.query(
      `UPDATE collections
       SET available_pieces = available_pieces + 1,
           sold_pieces = GREATEST(sold_pieces - 1, 0),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM collections WHERE id = $1', [id]);
  }
}
