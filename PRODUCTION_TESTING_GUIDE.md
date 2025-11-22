# Production Testing Guide - Persian Carpet Pre-sale System

## Production Status

✅ **NOWPayments Production API Configured**
- API Key: `KCARK06-V6442D5-NNC3BMB-HW7Q9YV`
- IPN Secret: `9e08f41f-61a2-4502-9127-44e498047119`
- Mode: Production (NOWPAYMENTS_SANDBOX=false)
- Whitelisted Currencies: TRX, USDT (TRC20)
- Wallet Address: `TRaAoevu2SKQB6m97rNdmq8ixzGpZmUbyj`

---

## Step 1: Restart Backend with New Credentials

**IMPORTANT:** Backend must be restarted to load new production API credentials from .env

```bash
cd ~/SafiraFull

# Restart backend with updated environment variables
pm2 restart persian-carpet-backend --update-env

# Verify it's running
pm2 status

# Check logs for any errors
pm2 logs persian-carpet-backend --lines 50
```

Expected output: Backend should start without errors and show production mode.

---

## Step 2: Verify Production API Connection

Test that backend can communicate with NOWPayments production API:

```bash
# Test 1: API Status
curl -X GET "https://api.nowpayments.io/v1/status" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"

# Expected: {"message":"OK"}

# Test 2: Available Currencies
curl -X GET "https://api.nowpayments.io/v1/currencies" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"

# Expected: Long list of currencies including "usdttrc20" and "trx"

# Test 3: Merchant Whitelisted Coins
curl -X GET "https://api.nowpayments.io/v1/merchant/coins" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"

# Expected: {"selectedCurrencies":["trx","usdttrc20"]}
```

---

## Step 3: Create First Collection (Admin Panel)

1. **Login to Admin Panel:**
   - URL: `http://141.11.1.85:5173/login`
   - Email: `emad.devel@gmail.com`
   - Password: `emadiemadi`

2. **Navigate to Collections:**
   - Go to: `http://141.11.1.85:5173/admin/collections`

3. **Create Collection:**
   - Click **"+ Add New Collection"**
   - Fill in the form:
     * **Name:** Persian Luxury Carpet - 2025 Edition
     * **Description:** Handwoven luxury Persian carpet with traditional Kerman design. Limited edition 100 pieces.
     * **Price per Piece (USDT):** 100
     * **Total Pieces:** 100
     * **Active:** ✅ (checked)
   - Click **"Create Collection"**

4. **Verify:**
   - Collection should appear in the list
   - Status should show "Active"
   - Available pieces should show 100

---

## Step 4: Test Complete Payment Flow

### 4.1 User Registration

1. **Logout from Admin Panel**
2. **Go to Home Page:** `http://141.11.1.85:5173`
3. **Click "Reserve Your Piece - $100"**
4. **Register New User:**
   - Full Name: Test User
   - Email: test@example.com
   - Password: testpass123
   - Click **"Sign Up"**

5. **Verify:**
   - Should redirect to `/reserve` after registration
   - Check email inbox for welcome email

### 4.2 Create Reservation

1. **Select Collection:**
   - Choose "Persian Luxury Carpet - 2025 Edition"

2. **Select Piece Number:**
   - Enter any number between 1-100 (e.g., `1`)

3. **Click "Proceed to Payment"**

4. **Verify:**
   - Should redirect to NOWPayments payment page
   - URL should be: `https://nowpayments.io/payment/?iid=XXXXXXX`
   - Check backend logs: `pm2 logs persian-carpet-backend --lines 20`

### 4.3 Complete Payment (REAL CRYPTO!)

⚠️ **WARNING:** This is production mode with real cryptocurrency!

1. **On NOWPayments Page:**
   - Select cryptocurrency: **USDT (TRC20)** or **TRX**
   - Amount should show: $100 equivalent
   - Copy the payment address
   - Copy the exact amount to send

2. **Send Cryptocurrency:**
   - Use your crypto wallet (e.g., TronLink, Trust Wallet)
   - Send EXACT amount shown
   - To the address shown
   - Wait for transaction confirmation

3. **Monitor Payment Status:**
   ```bash
   # Watch backend logs for IPN callback
   pm2 logs persian-carpet-backend --lines 100 --raw
   ```

4. **Expected IPN Callback:**
   - NOWPayments will send callback to: `http://141.11.1.85:5000/api/payments/ipn`
   - Backend should log: "IPN callback received"
   - Payment status should update in database
   - User should receive payment confirmation email

### 4.4 Verify in Dashboard

1. **Go to User Dashboard:** `http://141.11.1.85:5173/dashboard`
2. **Check Reservations:**
   - Should show the reservation
   - Status should be "Paid" (if payment completed)
   - Transaction ID should be visible

3. **Check Admin Panel:**
   - Login as admin
   - Go to: `http://141.11.1.85:5173/admin/reservations`
   - Should show the new reservation with payment status

---

## Step 5: Monitor Email Logs

Check that all emails were sent:

```bash
# Connect to PostgreSQL
psql -U postgres -d persian_carpet_db

# Query email logs
SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 10;

# Exit
\q
```

Expected emails:
1. Welcome email (on registration)
2. Reservation confirmation email (on reservation creation)
3. Payment confirmation email (on payment completion)

---

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs persian-carpet-backend --err --lines 50

# Common issues:
# - Database connection error
# - Port 5000 already in use
# - Environment variables not loaded
```

### Payment Creation Error

```bash
# Watch backend logs
pm2 logs persian-carpet-backend --lines 100

# Common errors:
# - "Can not get estimate" - Wrong currency pair
# - "Invalid API key" - Wrong API key or not restarted
# - "Currency not available" - Currency not whitelisted
```

### IPN Not Received

```bash
# Verify IPN endpoint is accessible
curl -X POST http://141.11.1.85:5000/api/payments/ipn \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Expected: {"error":"No token provided"} or authentication error
# This confirms endpoint is accessible

# Check NOWPayments IPN settings:
# - IPN callback URL should be: http://141.11.1.85:5000/api/payments/ipn
# - IPN Secret should match .env file
```

### "No Matches Found" in Payment Page

This means no cryptocurrencies are available. Causes:
1. Currencies not whitelisted in NOWPayments dashboard
2. Wallet address not set in NOWPayments dashboard
3. API key doesn't have merchant permissions

**Solution:** Check NOWPayments dashboard settings.

---

## Production Notes

### ⚠️ CRITICAL WARNINGS

1. **Real Money:** All payments are with real cryptocurrency
2. **Irreversible:** Crypto transactions cannot be reversed
3. **Test Small First:** Consider testing with minimum amounts first
4. **Monitor Closely:** Watch backend logs during initial transactions
5. **Backup Database:** Ensure regular database backups
6. **Secure API Keys:** Never commit production keys to public repos

### Security Checklist

- ✅ API keys stored in .env (not in code)
- ✅ .env file in .gitignore
- ✅ IPN signature verification enabled
- ✅ JWT authentication for user routes
- ✅ SQL injection protection (parameterized queries)
- ✅ Password hashing with bcrypt
- ✅ CORS configured

### Monitoring

```bash
# Watch backend logs continuously
pm2 logs persian-carpet-backend --raw

# Check PM2 status
pm2 status

# Check disk space
df -h

# Check PostgreSQL connections
psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"
```

---

## Success Criteria

✅ All tests pass:
- [ ] Backend starts without errors
- [ ] Production API connection successful
- [ ] Collection created in admin panel
- [ ] User registration works
- [ ] Reservation created successfully
- [ ] Redirected to NOWPayments page
- [ ] Payment completed (crypto sent)
- [ ] IPN callback received
- [ ] Payment status updated in database
- [ ] Emails sent successfully
- [ ] Dashboard shows paid reservation

---

## Support

If issues persist:
1. Check backend logs: `pm2 logs persian-carpet-backend`
2. Check database: `psql -U postgres -d persian_carpet_db`
3. Verify NOWPayments dashboard settings
4. Test API connection with curl commands above
