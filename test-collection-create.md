# تست و اضافه کردن Collection اول

## مرحله 1: آپدیت سرور

```bash
cd ~/SafiraFull

# Discard local changes
git reset --hard HEAD

# Pull latest fix
git pull origin claude/admin-user-panels-crypto-01VdNZta3d1sPU1aJBsNWCv1

# Build frontend
npm run build

# Restart PM2
pm2 restart persian-carpet-frontend

# Check status
pm2 status
```

## مرحله 2: دیدن Backend Logs

برای دیدن error دقیق payment:

```bash
pm2 logs persian-carpet-backend --lines 100
```

## مرحله 3: افزودن Collection اولین

1. لاگین کن به پنل ادمین: `http://141.11.1.85:5173/login`
   - Email: `emad.devel@gmail.com`
   - Password: `emadiemadi`

2. برو به `/admin/collections`

3. بزن روی **"+ Add New Collection"**

4. فیلدها رو پر کن:
   - **Name**: Persian Luxury Carpet - 2025 Edition
   - **Description**: Handwoven luxury Persian carpet with traditional Kerman design. Limited edition 100 pieces.
   - **Price per Piece (USDT)**: 100
   - **Total Pieces**: 100
   - **Active**: ✅ (checked)

5. بزن روی **"Create Collection"**

## مرحله 4: تست Reservation

1. Logout از پنل ادمین
2. برو به صفحه اصلی: `http://141.11.1.85:5173`
3. بزن روی **"Reserve Your Piece - $100"**
4. لاگین کن (یا یک user جدید بساز)
5. Collection انتخاب کن
6. Piece Number انتخاب کن
7. بزن روی **"Proceed to Payment"**

## مشکلات احتمالی خطای 500:

### 1. NOWPayments API Key مشکل دار
- API Key شاید expired شده
- API Key شاید permission نداره

### 2. NOWPayments Sandbox vs Production
- الان `NOWPAYMENTS_SANDBOX=false` (production mode)
- اگر API Key برای sandbox است، باید به `true` تغییر بدی

### 3. Network/Firewall Issue
- ممکنه سرور دسترسی به NOWPayments API نداشته باشه

### راه حل:

برای چک کردن NOWPayments API، روی سرور این command رو اجرا کن:

```bash
# Test NOWPayments API
curl -X GET "https://api.nowpayments.io/v1/status" \
  -H "x-api-key: ESZF661-GNVMVEP-NE3Z1R6-PT48BYE"
```

اگر error داد، یعنی API Key مشکل داره.

اگر success بود، بعد این رو امتحان کن:

```bash
# Test creating a payment
curl -X GET "https://api.nowpayments.io/v1/currencies" \
  -H "x-api-key: ESZF661-GNVMVEP-NE3Z1R6-PT48BYE"
```

اگر لیست currencies برگشت، یعنی API Key کار می‌کنه.
