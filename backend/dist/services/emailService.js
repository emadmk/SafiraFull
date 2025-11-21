"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentConfirmationEmail = exports.sendReservationEmail = exports.sendWelcomeEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const database_1 = require("../config/database");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.config.email.host,
    port: env_1.config.email.port,
    secure: false,
    auth: {
        user: env_1.config.email.user,
        pass: env_1.config.email.pass,
    },
});
const logEmail = async (userId, to, subject, body, status, errorMessage) => {
    try {
        await database_1.pool.query('INSERT INTO email_logs (user_id, to_email, subject, body, status, error_message) VALUES ($1, $2, $3, $4, $5, $6)', [userId || null, to, subject, body, status, errorMessage || null]);
    }
    catch (error) {
        console.error('Error logging email:', error);
    }
};
const sendEmail = async ({ to, subject, html, userId }) => {
    try {
        await transporter.sendMail({
            from: `"Persian Carpet Pre-sale" <${env_1.config.email.user}>`,
            to,
            subject,
            html,
        });
        await logEmail(userId, to, subject, html, 'sent');
        console.log(`✅ Email sent to ${to}`);
        return true;
    }
    catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error);
        await logEmail(userId, to, subject, html, 'failed', error.message);
        return false;
    }
};
exports.sendEmail = sendEmail;
const sendWelcomeEmail = async (to, fullName, userId) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>خوش آمدید!</h1>
        </div>
        <div class="content">
          <h2>سلام ${fullName} عزیز</h2>
          <p>به سیستم پیش‌فروش فرش‌های لوکس کرمان خوش آمدید.</p>
          <p>حساب کاربری شما با موفقیت ایجاد شد و اکنون می‌توانید از تمامی امکانات پلتفرم استفاده کنید.</p>
          <p>برای مشاهده کالکشن‌های موجود و رزرو قطعه دلخواه خود، به پنل کاربری خود مراجعه کنید.</p>
          <a href="${env_1.config.urls.frontend}/dashboard" class="button">ورود به پنل کاربری</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;
    return (0, exports.sendEmail)({ to, subject: 'خوش آمدید - ثبت نام موفق', html, userId });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendReservationEmail = async (to, fullName, collectionName, pieceNumber, userId) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>رزرو موفق</h1>
        </div>
        <div class="content">
          <h2>سلام ${fullName} عزیز</h2>
          <p>رزرو شما با موفقیت ثبت شد!</p>
          <div class="info-box">
            <h3>جزئیات رزرو:</h3>
            <p><strong>کالکشن:</strong> ${collectionName}</p>
            <p><strong>شماره قطعه:</strong> ${pieceNumber}</p>
          </div>
          <p>لطفاً در اسرع وقت نسبت به پرداخت اقدام کنید تا رزرو شما نهایی شود.</p>
          <a href="${env_1.config.urls.frontend}/dashboard" class="button">مشاهده رزرو و پرداخت</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;
    return (0, exports.sendEmail)({ to, subject: `رزرو موفق - ${collectionName}`, html, userId });
};
exports.sendReservationEmail = sendReservationEmail;
const sendPaymentConfirmationEmail = async (to, fullName, orderId, amount, txid, userId) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #10b981; }
        .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✓ پرداخت تایید شد</h1>
        </div>
        <div class="content">
          <h2>سلام ${fullName} عزیز</h2>
          <p>پرداخت شما با موفقیت تایید شد!</p>
          <div class="info-box">
            <h3>جزئیات پرداخت:</h3>
            <p><strong>شماره سفارش:</strong> ${orderId}</p>
            <p><strong>مبلغ:</strong> ${amount} USDT</p>
            <p><strong>TXID:</strong> ${txid}</p>
          </div>
          <p>رزرو شما نهایی شده و به زودی قطعه انتخابی شما آماده تحویل خواهد بود.</p>
          <a href="${env_1.config.urls.frontend}/dashboard" class="button">مشاهده جزئیات</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;
    return (0, exports.sendEmail)({ to, subject: 'پرداخت تایید شد', html, userId });
};
exports.sendPaymentConfirmationEmail = sendPaymentConfirmationEmail;
