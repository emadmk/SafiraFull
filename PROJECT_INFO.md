# Persian Kerman Carpet Pre-sale System

## 🎯 پروژه آماده و در حال اجرا!

سیستم کامل پیش‌فروش فرش‌های لوکس کرمان با پنل ادمین و کاربری

## 📊 وضعیت فعلی

✅ **Backend**: در حال اجرا روی پورت **5000**
✅ **Frontend**: در حال اجرا روی پورت **5173**
✅ **Database**: PostgreSQL راه‌اندازی شده و مایگریت شده
✅ **PM2**: سرویس‌ها با PM2 مدیریت می‌شوند

## 🌐 آدرس‌های دسترسی

- **Frontend**: http://141.11.1.85:5173
- **Backend API**: http://141.11.1.85:5000/api
- **Health Check**: http://141.11.1.85:5000/health

## 👤 حساب‌های کاربری

### ادمین (از قبل ایجاد شده)
- **Email**: emad.devel@gmail.com
- **Password**: emadiemadi
- **پنل**: بعد از ورود به طور خودکار به پنل ادمین هدایت می‌شود

### کاربر جدید
- می‌توانید از صفحه Register ثبت نام کنید

## 🛠 ساختار پروژه

```
SafiraFull/
├── backend/               # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── config/       # تنظیمات دیتابیس و env
│   │   ├── controllers/  # کنترلرهای API
│   │   ├── models/       # مدل‌های دیتابیس
│   │   ├── routes/       # مسیرهای API
│   │   ├── services/     # سرویس‌های NOWPayments و Email
│   │   ├── middlewares/  # Authentication و Error handling
│   │   └── utils/        # JWT و سایر utilities
│   └── dist/            # فایل‌های build شده
├── src/                 # React + Vite Frontend
│   ├── pages/          # صفحات Login, Register, Dashboards
│   ├── contexts/       # AuthContext
│   ├── lib/            # API client
│   └── components/     # کامپوننت‌های UI موجود
├── build/              # Frontend build
└── ecosystem.config.js # PM2 configuration

## 🚀 قابلیت‌های پیاده‌سازی شده

### بک‌اند
- ✅ سیستم احراز هویت با JWT
- ✅ مدیریت کاربران (User Management)
- ✅ مدیریت کالکشن‌ها (Collections)
- ✅ سیستم رزرو قطعات
- ✅ یکپارچه‌سازی با درگاه کریپتو NOWPayments
- ✅ سیستم ارسال ایمیل (Gmail SMTP)
- ✅ پنل ادمین با آمار و گزارشات کامل
- ✅ مدیریت تنظیمات (Settings)
- ✅ IPN Webhook برای تایید خودکار پرداخت‌ها

### فرانت‌اند
- ✅ صفحه اصلی لوکس (لندینگ پیج)
- ✅ صفحات ورود و ثبت نام
- ✅ پنل کاربری با نمایش رزروها و پرداخت‌ها
- ✅ پنل ادمین با داشبورد و آمار
- ✅ Routing و Protected Routes
- ✅ State Management با Context API

## 📡 API Endpoints

### Authentication
- POST `/api/auth/register` - ثبت نام
- POST `/api/auth/login` - ورود

### User
- GET `/api/user/profile` - پروفایل کاربر
- PUT `/api/user/profile` - ویرایش پروفایل
- GET `/api/user/reservations` - رزروهای کاربر
- GET `/api/user/payments` - پرداخت‌های کاربر

### Collections
- GET `/api/collections` - لیست کالکشن‌ها
- GET `/api/collections/:id` - جزئیات کالکشن
- GET `/api/collections/:id/available-pieces` - قطعات موجود

### Reservations
- POST `/api/reservations` - ایجاد رزرو جدید
- GET `/api/reservations/:id` - جزئیات رزرو

### Payments
- POST `/api/payments` - ایجاد پرداخت
- GET `/api/payments/:payment_id/status` - وضعیت پرداخت
- POST `/api/payments/submit-txid` - ثبت Transaction ID
- POST `/api/payments/ipn` - IPN Webhook (NOWPayments)

### Admin
- GET `/api/admin/dashboard` - داشبورد و آمار
- POST `/api/admin/collections` - ایجاد کالکشن
- PUT `/api/admin/collections/:id` - ویرایش کالکشن
- DELETE `/api/admin/collections/:id` - حذف کالکشن
- GET `/api/admin/users` - لیست کاربران
- GET `/api/admin/reservations` - لیست رزروها
- GET `/api/admin/payments` - لیست پرداخت‌ها
- GET `/api/admin/settings` - تنظیمات
- PUT `/api/admin/settings` - ویرایش تنظیمات

## 🔧 مدیریت سرویس‌ها با PM2

### دستورات مفید PM2

```bash
# مشاهده وضعیت
pm2 status

# مشاهده لاگ‌ها
pm2 logs

# Restart سرویس‌ها
pm2 restart all

# Stop سرویس‌ها
pm2 stop all

# شروع مجدد
pm2 start ecosystem.config.js

# حذف سرویس‌ها
pm2 delete all
```

## 🗄 Database

### اتصال به دیتابیس
```bash
psql -U postgres -d persian_carpet_db
```

### جداول اصلی
- `users` - کاربران
- `collections` - کالکشن‌های فرش
- `reservations` - رزروها
- `payments` - پرداخت‌ها
- `settings` - تنظیمات سیستم
- `email_logs` - لاگ ایمیل‌ها

## 💳 تنظیمات پرداخت

### NOWPayments Configuration
- **API Key**: تنظیم شده در ecosystem.config.js
- **IPN Secret**: برای تایید Webhooks
- **Supported Currencies**: USDT و سایر ارزهای دیجیتال

### فعال/غیرفعال کردن درگاه
از پنل ادمین > Settings می‌توانید درگاه پرداخت را فعال یا غیرفعال کنید.

## 📧 Email Notifications

سیستم در موارد زیر ایمیل ارسال می‌کند:
- ✅ ثبت نام کاربر جدید (Welcome Email)
- ✅ ایجاد رزرو جدید
- ✅ تایید پرداخت

## 🔐 امنیت

- ✅ Password Hashing با bcrypt
- ✅ JWT Token Authentication
- ✅ Protected API Routes
- ✅ Input Validation
- ✅ SQL Injection Prevention (Parameterized Queries)
- ✅ CORS Configuration

## 📝 یادداشت‌های مهم

1. **PostgreSQL باید همیشه در حال اجرا باشد**
   ```bash
   service postgresql status
   service postgresql start
   ```

2. **برای مشاهده لاگ‌های زنده:**
   ```bash
   pm2 logs --lines 100
   ```

3. **برای اضافه کردن کالکشن جدید:**
   - ورود به پنل ادمین
   - از Quick Actions استفاده کنید

## 🎨 Frontend Tech Stack

- React 18
- TypeScript
- Vite 6
- React Router DOM
- Axios
- Tailwind CSS
- Radix UI Components

## ⚙️ Backend Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- NOWPayments Integration
- Nodemailer (Gmail SMTP)

## 📞 پشتیبانی

برای هرگونه مشکل یا سوال، لطفاً با تیم توسعه تماس بگیرید.

---

**🎉 پروژه کامل و آماده استفاده است!**

برای شروع، به آدرس http://141.11.1.85:5173 بروید.
