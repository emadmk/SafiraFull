"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const collectionRoutes_1 = __importDefault(require("./routes/collectionRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.config.urls.frontend,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/collections', collectionRoutes_1.default);
app.use('/api/reservations', reservationRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/test', testRoutes_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
    });
});
// Start server
const startServer = async () => {
    try {
        // Test database connection
        await (0, database_1.testConnection)();
        // Start listening
        app.listen(env_1.config.port, () => {
            console.log(`
╔════════════════════════════════════════╗
║   Persian Carpet Pre-sale Backend     ║
║                                        ║
║   🚀 Server running on port ${env_1.config.port}     ║
║   🌍 Environment: ${env_1.config.nodeEnv.padEnd(18)}║
║   📊 Database: Connected               ║
║                                        ║
║   API: ${env_1.config.urls.backend.padEnd(26)}║
║   Frontend: ${env_1.config.urls.frontend.padEnd(21)}║
╚════════════════════════════════════════╝
      `);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
