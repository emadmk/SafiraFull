# راهنمای نصب کامل - سرور لینوکس 22.04

## 🚀 مراحل نصب از صفر تا صد

### مرحله 1: به‌روزرسانی سیستم و نصب ابزارهای اولیه

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# نصب ابزارهای ضروری
sudo apt install -y curl wget git build-essential
```

---

### مرحله 2: نصب Node.js 20.x

```bash
# نصب NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# نصب Node.js و npm
sudo apt install -y nodejs

# تایید نصب
node --version
npm --version
```

---

### مرحله 3: نصب و تنظیم PostgreSQL 16

```bash
# نصب PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# شروع سرویس PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# تایید نصب
sudo systemctl status postgresql
```

#### تنظیم PostgreSQL:

```bash
# ویرایش فایل pg_hba.conf
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

**در فایل pg_hba.conf، خط زیر را پیدا کنید:**
```
host    all             all             127.0.0.1/32            scram-sha-256
```

**و آن را به این تغییر دهید:**
```
host    all             all             127.0.0.1/32            md5
```

**همچنین این خط را:**
```
local   all             postgres                                peer
```

**به این تغییر دهید:**
```
local   all             postgres                                trust
```

**ذخیره کنید (Ctrl+O, Enter, Ctrl+X) و بعد:**

```bash
# Reload PostgreSQL
sudo systemctl reload postgresql

# ست کردن پسورد postgres
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

# ساخت دیتابیس
sudo -u postgres psql -c "CREATE DATABASE persian_carpet_db;"

# تست اتصال
psql -U postgres -h localhost -d persian_carpet_db -c "SELECT 1;"
```

---

### مرحله 4: نصب PM2 (Process Manager)

```bash
# نصب PM2 به صورت global
sudo npm install -g pm2

# تایید نصب
pm2 --version
```

---

### مرحله 5: Clone کردن پروژه از GitHub

```bash
# رفتن به home directory
cd ~

# Clone repository
git clone https://github.com/emadmk/SafiraFull.git

# ورود به پوشه پروژه
cd SafiraFull

# رفتن به branch مربوطه
git checkout claude/admin-user-panels-crypto-01VdNZta3d1sPU1aJBsNWCv1
```

---

### مرحله 6: تنظیم Backend

```bash
# ورود به پوشه backend
cd ~/SafiraFull/backend

# نصب dependencies
npm install

# نصب type definitions
npm install --save-dev @types/pg

# ویرایش فایل .env (اگر نیاز به تغییر داشت)
nano .env
```

**محتوای فایل .env (از قبل موجود است):**
```env
PORT=5000
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_NAME=persian_carpet_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=qsRFZYsVeXCxLYdXX/wqo10Xda1K425QABgW2e1HrwQ=
JWT_EXPIRE=7d

NOWPAYMENTS_API_KEY=ESZF661-GNVMVEP-NE3Z1R6-PT48BYE
NOWPAYMENTS_IPN_SECRET=6fd80582-c7d8-4498-836e-9880a1f93314
NOWPAYMENTS_SANDBOX=false

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=makhdoumiemad@gmail.com
SMTP_PASS=tazv kpdo ekpq wcfz

FRONTEND_URL=http://141.11.1.85:5173
BACKEND_URL=http://141.11.1.85:5000

ADMIN_EMAIL=emad.devel@gmail.com
ADMIN_PASSWORD=emadiemadi
```

```bash
# اجرای migration (ساخت جداول دیتابیس)
npm run migrate

# Build کردن backend
npm run build

# بازگشت به root پروژه
cd ~/SafiraFull
```

---

### مرحله 7: تنظیم Frontend

```bash
# نصب dependencies فرانتند
npm install

# Build کردن frontend
npm run build
```

---

### مرحله 8: نصب serve برای سرو کردن Frontend

```bash
# نصب serve به صورت global
sudo npm install -g serve
```

---

### مرحله 9: راه‌اندازی با PM2

```bash
# بازگشت به root پروژه
cd ~/SafiraFull

# شروع سرویس‌ها با PM2
pm2 start ecosystem.config.js

# ذخیره configuration
pm2 save

# تنظیم PM2 برای شروع خودکار بعد از reboot
pm2 startup
# دستور بالا یک command میده که باید اجرا کنید (با sudo)
# مثال: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u YOUR_USER --hp /home/YOUR_USER

# چک کردن وضعیت
pm2 status
pm2 logs
```

---

### مرحله 10: تنظیم Firewall (اختیاری اما توصیه می‌شود)

```bash
# فعال کردن UFW
sudo ufw enable

# اجازه دادن به SSH (حتماً قبل از enable!)
sudo ufw allow 22/tcp

# اجازه دادن به پورت‌های برنامه
sudo ufw allow 5000/tcp  # Backend
sudo ufw allow 5173/tcp  # Frontend

# چک کردن وضعیت
sudo ufw status
```

---

### مرحله 11: تست سیستم

```bash
# تست Backend
curl http://localhost:5000/health

# تست Frontend
curl -I http://localhost:5173

# مشاهده لاگ‌ها
pm2 logs
```

---

## 🔍 دستورات مفید PM2

```bash
# مشاهده وضعیت سرویس‌ها
pm2 status

# مشاهده لاگ‌ها (real-time)
pm2 logs

# مشاهده لاگ‌های یک سرویس خاص
pm2 logs persian-carpet-backend
pm2 logs persian-carpet-frontend

# Restart سرویس‌ها
pm2 restart all
pm2 restart persian-carpet-backend
pm2 restart persian-carpet-frontend

# Stop سرویس‌ها
pm2 stop all

# Start مجدد
pm2 start ecosystem.config.js

# حذف سرویس‌ها از PM2
pm2 delete all

# مانیتورینگ
pm2 monit
```

---

## 🗄️ دستورات مفید PostgreSQL

```bash
# ورود به PostgreSQL
psql -U postgres -h localhost -d persian_carpet_db

# مشاهده تمام جداول
\dt

# مشاهده کاربران
SELECT * FROM users;

# مشاهده collections
SELECT * FROM collections;

# خروج
\q

# Backup گرفتن
pg_dump -U postgres -h localhost persian_carpet_db > backup.sql

# Restore کردن
psql -U postgres -h localhost persian_carpet_db < backup.sql
```

---

## 🔧 عیب‌یابی (Troubleshooting)

### اگر Backend راه نیفتاد:

```bash
# چک کردن لاگ‌ها
pm2 logs persian-carpet-backend --lines 100

# چک کردن اتصال به دیتابیس
psql -U postgres -h localhost -d persian_carpet_db

# راه‌اندازی مجدد
pm2 restart persian-carpet-backend
```

### اگر Frontend راه نیفتاد:

```bash
# چک کردن لاگ‌ها
pm2 logs persian-carpet-frontend --lines 100

# بررسی build
ls -la ~/SafiraFull/build

# راه‌اندازی مجدد
pm2 restart persian-carpet-frontend
```

### اگر PostgreSQL مشکل داشت:

```bash
# چک کردن وضعیت
sudo systemctl status postgresql

# راه‌اندازی مجدد
sudo systemctl restart postgresql

# مشاهده لاگ‌ها
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

---

## 📝 آدرس‌های دسترسی

بعد از اتمام نصب:

- **Frontend**: http://141.11.1.85:5173
- **Backend API**: http://141.11.1.85:5000/api
- **Health Check**: http://141.11.1.85:5000/health

### ورود به پنل ادمین:
- **Email**: emad.devel@gmail.com
- **Password**: emadiemadi

---

## 🔄 آپدیت کردن پروژه

اگر بعداً تغییراتی در GitHub push کردید:

```bash
# رفتن به پوشه پروژه
cd ~/SafiraFull

# Pull کردن آخرین تغییرات
git pull origin claude/admin-user-panels-crypto-01VdNZta3d1sPU1aJBsNWCv1

# Backend
cd backend
npm install
npm run build

# Frontend
cd ~/SafiraFull
npm install
npm run build

# Restart سرویس‌ها
pm2 restart all
```

---

## 🛡️ نکات امنیتی

1. **تغییر پسورد PostgreSQL**:
```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'your-strong-password';"
```

2. **تغییر JWT Secret** در فایل `.env`:
```bash
nano ~/SafiraFull/backend/.env
# تغییر JWT_SECRET
```

3. **محدود کردن دسترسی PostgreSQL** (فقط localhost):
```bash
sudo nano /etc/postgresql/16/main/postgresql.conf
# مطمئن شوید listen_addresses = 'localhost'
```

4. **فعال کردن HTTPS** (توصیه می‌شود):
- استفاده از Nginx + Let's Encrypt
- راهنمای کامل در صورت نیاز ارائه می‌شود

---

## ✅ چک‌لیست نصب

- [ ] Node.js نصب شد
- [ ] PostgreSQL نصب و تنظیم شد
- [ ] PM2 نصب شد
- [ ] Repository clone شد
- [ ] Backend dependencies نصب شد
- [ ] Frontend dependencies نصب شد
- [ ] Database migrate شد
- [ ] Backend build شد
- [ ] Frontend build شد
- [ ] PM2 راه‌اندازی شد
- [ ] Firewall تنظیم شد
- [ ] سیستم تست شد ✅

---

## 🆘 پشتیبانی

در صورت بروز مشکل:
1. لاگ‌های PM2 را بررسی کنید: `pm2 logs`
2. وضعیت PostgreSQL را چک کنید: `sudo systemctl status postgresql`
3. مطمئن شوید تمام پورت‌ها باز هستند

**🎉 موفق باشید!**
