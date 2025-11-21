import { pool } from '../config/database';
import { Setting } from '../types';

export class SettingModel {
  static async get(key: string): Promise<string | null> {
    const result = await pool.query('SELECT value FROM settings WHERE key = $1', [key]);
    return result.rows[0]?.value || null;
  }

  static async set(key: string, value: string): Promise<Setting> {
    const result = await pool.query(
      `INSERT INTO settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key)
       DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [key, value]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Setting[]> {
    const result = await pool.query('SELECT * FROM settings ORDER BY key');
    return result.rows;
  }

  static async delete(key: string): Promise<void> {
    await pool.query('DELETE FROM settings WHERE key = $1', [key]);
  }
}
