import { pool } from '../config/database';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Collections table
    await client.query(`
      CREATE TABLE IF NOT EXISTS collections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        price_usdt DECIMAL(10, 2) NOT NULL,
        total_pieces INTEGER NOT NULL,
        available_pieces INTEGER NOT NULL,
        sold_pieces INTEGER DEFAULT 0,
        delivery_date TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Reservations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
        piece_number INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'confirmed', 'delivered', 'cancelled')),
        delivery_address TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(collection_id, piece_number)
      )
    `);

    // Payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        payment_id VARCHAR(255) UNIQUE,
        order_id VARCHAR(255) UNIQUE NOT NULL,
        amount_usdt DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USDT',
        status VARCHAR(50) DEFAULT 'waiting' CHECK (status IN ('waiting', 'confirming', 'confirmed', 'sending', 'partially_paid', 'finished', 'failed', 'refunded', 'expired')),
        txid VARCHAR(255),
        payment_url TEXT,
        nowpayments_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value TEXT,
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Email logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        to_email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        body TEXT,
        status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed')),
        error_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default settings
    await client.query(`
      INSERT INTO settings (key, value, description) VALUES
        ('payment_gateway_enabled', 'true', 'Enable/disable payment gateway'),
        ('base_price_usdt', '100', 'Base price in USDT for reservations'),
        ('site_maintenance', 'false', 'Site maintenance mode')
      ON CONFLICT (key) DO NOTHING
    `);

    // Create admin user
    const hashedPassword = await bcrypt.hash(config.admin.password, 10);
    await client.query(`
      INSERT INTO users (email, password, full_name, role)
      VALUES ($1, $2, 'Admin User', 'admin')
      ON CONFLICT (email) DO NOTHING
    `, [config.admin.email, hashedPassword]);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
      CREATE INDEX IF NOT EXISTS idx_reservations_collection_id ON reservations(collection_id);
      CREATE INDEX IF NOT EXISTS idx_payments_reservation_id ON payments(reservation_id);
      CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
      CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

const migrate = async () => {
  try {
    await createTables();
    console.log('✅ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  migrate();
}

export { createTables };
