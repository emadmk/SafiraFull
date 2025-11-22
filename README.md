# Persian Carpet Pre-Sale Platform

A full-stack cryptocurrency payment platform for Persian Kerman carpet pre-sales, featuring NOWPayments integration for multi-currency crypto payments.

## Overview

This platform allows users to browse luxury Persian carpet collections, reserve pieces, and pay using cryptocurrency (USDT TRC20, TRX, and other supported currencies). The system includes user authentication, admin management panels, and automated email notifications.

## Features

### User Features
- Browse carpet collections with detailed information
- Reserve specific carpet pieces
- Pay with cryptocurrency via NOWPayments
- Multi-currency selection (USDT TRC20, TRX, etc.)
- User dashboard to track reservations and payments
- Real-time payment status updates via IPN callbacks
- Email notifications for transactions

### Admin Features
- Admin dashboard with revenue and sales statistics
- Manage collections (create, edit, delete)
- View all users and their details
- Comprehensive reservations management page with:
  - Total revenue tracking
  - Paid vs pending reservations
  - Filter by status, collection, date range
  - Search functionality
  - Detailed payment information
- Email delivery tracking

## Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **Authentication:** JWT + bcrypt
- **Email:** Nodemailer (Gmail SMTP)
- **Process Manager:** PM2
- **Payment Gateway:** NOWPayments API v1

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios

## Installation

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 16
- PM2 (for production)
- NOWPayments account with API credentials

### 1. Clone Repository
```bash
git clone https://github.com/emadmk/SafiraFull.git
cd SafiraFull
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (from root)
cd ..
npm install
```

### 3. Database Setup

Create PostgreSQL database and user:
```sql
CREATE DATABASE persian_carpet_db;
CREATE USER carpet_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE persian_carpet_db TO carpet_admin;
```

Run database migrations (tables will be created automatically on first run).

### 4. Environment Configuration

Create `backend/.env` file:
```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=persian_carpet_db
DB_USER=carpet_admin
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_jwt_secret_key_change_this

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# NOWPayments
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
NOWPAYMENTS_IPN_SECRET=your_nowpayments_ipn_secret
NOWPAYMENTS_SANDBOX=false

# URLs
BACKEND_URL=http://your_server_ip:5000
FRONTEND_URL=http://your_server_ip:5173
```

**Important Notes:**
- For Gmail, use App Password (not regular password): https://support.google.com/accounts/answer/185833
- Get NOWPayments credentials from: https://nowpayments.io/
- Set up IPN callback URL in NOWPayments dashboard: `http://your_server_ip:5000/api/payments/ipn`
- Whitelist currencies in NOWPayments dashboard (recommended: USDTTRC20, TRX)

### 5. PM2 Configuration

Update `ecosystem.config.js` with your server paths:
```javascript
module.exports = {
  apps: [
    {
      name: 'persian-carpet-backend',
      script: 'dist/index.js',
      cwd: '/your/path/SafiraFull',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        // ... other env vars
      }
    },
    {
      name: 'persian-carpet-frontend',
      script: 'npx',
      args: 'vite preview --host 0.0.0.0 --port 5173',
      cwd: '/your/path/SafiraFull',
    }
  ]
};
```

## Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev
```

### Production Mode

**Build:**
```bash
# Build backend
cd backend
npm run build

# Build frontend (from root)
cd ..
npm run build
```

**Deploy with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Useful PM2 Commands:**
```bash
pm2 status                 # Check status
pm2 logs                   # View logs
pm2 restart all            # Restart all apps
pm2 restart backend --update-env  # Restart with new env vars
pm2 stop all               # Stop all apps
pm2 delete all             # Remove all apps
```

## NOWPayments Integration

### Payment Flow
1. User selects carpet collection and piece number
2. System creates reservation in database
3. Backend calls NOWPayments Invoice API
4. User redirected to NOWPayments page to select currency and pay
5. NOWPayments sends IPN callback when payment status changes
6. System updates reservation and payment status
7. Email sent to user confirming payment

### IPN Signature Verification
The system validates IPN callbacks using HMAC-SHA512:
```typescript
const hmac = crypto.createHmac('sha512', ipnSecret);
hmac.update(JSON.stringify(sortedBody));
const computedSignature = hmac.digest('hex');
```

### Supported Payment Statuses
- `waiting` - Payment initiated, awaiting crypto transfer
- `confirming` - Transaction detected, awaiting confirmations
- `confirmed` - Transaction confirmed
- `sending` - NOWPayments sending to merchant
- `finished` - Payment complete (reservation marked as paid)
- `failed` - Payment failed
- `refunded` - Payment refunded
- `expired` - Payment window expired

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Collections (Admin)
- `GET /api/collections` - Get all collections
- `POST /api/collections` - Create collection (admin)
- `PUT /api/collections/:id` - Update collection (admin)
- `DELETE /api/collections/:id` - Delete collection (admin)

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get user's reservations
- `GET /api/admin/reservations` - Get all reservations (admin)

### Payments
- `POST /api/payments/create` - Create payment
- `POST /api/payments/ipn` - NOWPayments IPN callback
- `GET /api/payments` - Get user's payments
- `GET /api/admin/payments` - Get all payments (admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/email-logs` - Email delivery logs

## Project Structure

```
SafiraFull/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth & validation middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (NOWPayments, Email)
│   │   └── index.ts         # Entry point
│   ├── dist/                # Compiled JavaScript (gitignored)
│   ├── .env                 # Environment variables (gitignored)
│   └── package.json
├── src/
│   ├── api/                 # API client functions
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── dist/                    # Frontend build output (gitignored)
├── ecosystem.config.js      # PM2 configuration
├── package.json             # Frontend dependencies
└── README.md               # This file
```

## Default Admin Account

After first run, an admin account is created:
- **Email:** admin@example.com
- **Password:** Admin@123456

**Important:** Change this password immediately after first login!

## Troubleshooting

### IPN Signature Validation Fails
1. Check that `NOWPAYMENTS_IPN_SECRET` in `.env` matches NOWPayments dashboard
2. Restart PM2 with `--update-env` flag: `pm2 restart backend --update-env`
3. Check backend logs: `pm2 logs backend`

### Payment Minimum Amount Error
NOWPayments has minimum payment amounts per currency:
- USDT TRC20: ~$10 minimum
- TRX: ~$5 minimum
- BTC: ~$30 minimum

Set collection prices above these minimums.

### Database Connection Error
1. Verify PostgreSQL is running: `sudo systemctl status postgresql`
2. Check credentials in `.env`
3. Ensure database exists and user has permissions

### Email Not Sending
1. Verify Gmail App Password (not regular password)
2. Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
3. Enable "Less secure app access" or use App Password
4. Check email logs: `GET /api/admin/email-logs`

### Frontend Shows White Screen
1. Check browser console for errors
2. Verify backend is running: `pm2 status`
3. Check CORS settings in backend
4. Rebuild frontend: `npm run build && pm2 restart frontend`

### Stats Showing Zero
1. Check API response structure in browser console
2. Verify reservations and payments exist in database
3. Check data extraction logic in `ManageReservationsPage.tsx`

## Security Considerations

1. **Environment Variables:** Never commit `.env` files
2. **JWT Secret:** Use strong, random secret (min 32 characters)
3. **Database Password:** Use strong password
4. **Admin Password:** Change default admin password immediately
5. **IPN Verification:** Always validate IPN signatures
6. **CORS:** Configure proper CORS origins for production
7. **HTTPS:** Use SSL/TLS in production (nginx/caddy reverse proxy)

## Production Deployment

### Recommended Setup
1. Use reverse proxy (nginx/caddy) for SSL/TLS
2. Set up firewall (ufw) to restrict ports
3. Enable PostgreSQL backups
4. Configure PM2 startup script
5. Set up monitoring (PM2 Plus or custom)
6. Use environment-specific `.env` files
7. Enable log rotation for PM2

### Example Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## License

This project is proprietary and confidential.

## Support

For issues and questions, contact the development team.

## Changelog

### Version 1.0.0 (2025-11-22)
- Initial release
- User authentication and authorization
- Collection management system
- Cryptocurrency payment integration with NOWPayments
- Multi-currency support (Invoice API)
- IPN callback handling with signature verification
- User and admin dashboards
- Email notification system
- Comprehensive admin reservations management
- Real-time payment status updates
