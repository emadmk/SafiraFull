import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { config } from './config/env';

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import collectionRoutes from './routes/collectionRoutes';
import reservationRoutes from './routes/reservationRoutes';
import paymentRoutes from './routes/paymentRoutes';
import adminRoutes from './routes/adminRoutes';
import testRoutes from './routes/testRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: config.urls.frontend,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/test', testRoutes);

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
    await testConnection();

    // Start listening
    app.listen(config.port, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Persian Carpet Pre-sale Backend     ║
║                                        ║
║   🚀 Server running on port ${config.port}     ║
║   🌍 Environment: ${config.nodeEnv.padEnd(18)}║
║   📊 Database: Connected               ║
║                                        ║
║   API: ${config.urls.backend.padEnd(26)}║
║   Frontend: ${config.urls.frontend.padEnd(21)}║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
