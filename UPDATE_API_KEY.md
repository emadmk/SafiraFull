# Update NOWPayments API Key on Server

## New Production Credentials

```bash
API Key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV
IPN Secret: 9e08f41f-61a2-4502-9127-44e498047119
```

## Whitelisted Wallets

- **TRX**: TRaAoevu2SKQB6m97rNdmq8ixzGpZmUbyj
- **USDT (TRC20)**: TRaAoevu2SKQB6m97rNdmq8ixzGpZmUbyj

---

## Update Steps on Server

### 1. Edit .env file

```bash
nano /root/SafiraFull/backend/.env
```

Update these lines:
```env
NODE_ENV=production
NOWPAYMENTS_API_KEY=KCARK06-V6442D5-NNC3BMB-HW7Q9YV
NOWPAYMENTS_IPN_SECRET=9e08f41f-61a2-4502-9127-44e498047119
NOWPAYMENTS_SANDBOX=false
```

Save: Ctrl+X, Y, Enter

### 2. Restart Backend

```bash
pm2 restart persian-carpet-backend --update-env
```

### 3. Test API Connection

```bash
curl -X GET "https://api.nowpayments.io/v1/status" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"
```

Expected: {"message":"OK"}

### 4. Test Currencies

```bash
curl -X GET "https://api.nowpayments.io/v1/currencies" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"
```

### 5. Test Merchant Coins

```bash
curl -X GET "https://api.nowpayments.io/v1/merchant/coins" \
  -H "x-api-key: KCARK06-V6442D5-NNC3BMB-HW7Q9YV"
```

Should show TRX and USDT.

---

## Production Notes

⚠️ **IMPORTANT**: Real cryptocurrency payments!
- Monitor IPN callbacks
- Keep API keys secure
