"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = void 0;
const database_1 = require("../config/database");
class SettingModel {
    static async get(key) {
        const result = await database_1.pool.query('SELECT value FROM settings WHERE key = $1', [key]);
        return result.rows[0]?.value || null;
    }
    static async set(key, value) {
        const result = await database_1.pool.query(`INSERT INTO settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key)
       DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`, [key, value]);
        return result.rows[0];
    }
    static async getAll() {
        const result = await database_1.pool.query('SELECT * FROM settings ORDER BY key');
        return result.rows;
    }
    static async delete(key) {
        await database_1.pool.query('DELETE FROM settings WHERE key = $1', [key]);
    }
}
exports.SettingModel = SettingModel;
