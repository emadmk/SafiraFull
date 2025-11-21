"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel {
    static async create(email, password, fullName, phone) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const result = await database_1.pool.query(`INSERT INTO users (email, password, full_name, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [email, hashedPassword, fullName, phone]);
        return result.rows[0];
    }
    static async findByEmail(email) {
        const result = await database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
    static async findById(id) {
        const result = await database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    static async updateProfile(id, data) {
        const fields = [];
        const values = [];
        let paramCount = 1;
        if (data.full_name) {
            fields.push(`full_name = $${paramCount++}`);
            values.push(data.full_name);
        }
        if (data.phone !== undefined) {
            fields.push(`phone = $${paramCount++}`);
            values.push(data.phone);
        }
        if (data.address !== undefined) {
            fields.push(`address = $${paramCount++}`);
            values.push(data.address);
        }
        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);
        const result = await database_1.pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`, values);
        return result.rows[0];
    }
    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await database_1.pool.query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [hashedPassword, id]);
    }
    static async comparePassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    static async getAll(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const [usersResult, countResult] = await Promise.all([
            database_1.pool.query('SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
            database_1.pool.query('SELECT COUNT(*) FROM users'),
        ]);
        return {
            users: usersResult.rows,
            total: parseInt(countResult.rows[0].count),
        };
    }
    static async getTotalCount() {
        const result = await database_1.pool.query('SELECT COUNT(*) FROM users');
        return parseInt(result.rows[0].count);
    }
}
exports.UserModel = UserModel;
