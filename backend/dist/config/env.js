"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '5000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'persian_carpet_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-me',
        expire: process.env.JWT_EXPIRE || '7d',
    },
    nowPayments: {
        apiKey: process.env.NOWPAYMENTS_API_KEY || '',
        ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET || '',
        sandbox: process.env.NOWPAYMENTS_SANDBOX === 'true',
    },
    email: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
    urls: {
        frontend: process.env.FRONTEND_URL || 'http://localhost:5173',
        backend: process.env.BACKEND_URL || 'http://localhost:5000',
    },
    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
    },
};
