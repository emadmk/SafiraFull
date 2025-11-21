import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { pool } from '../config/database';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  userId?: number;
}

const logEmail = async (userId: number | undefined, to: string, subject: string, body: string, status: 'sent' | 'failed', errorMessage?: string) => {
  try {
    await pool.query(
      'INSERT INTO email_logs (user_id, to_email, subject, body, status, error_message) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId || null, to, subject, body, status, errorMessage || null]
    );
  } catch (error) {
    console.error('Error logging email:', error);
  }
};

export const sendEmail = async ({ to, subject, html, userId }: EmailOptions): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: `"Persian Carpet Pre-sale" <${config.email.user}>`,
      to,
      subject,
      html,
    });

    await logEmail(userId, to, subject, html, 'sent');
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error sending email to ${to}:`, error);
    await logEmail(userId, to, subject, html, 'failed', error.message);
    return false;
  }
};

export const sendWelcomeEmail = async (to: string, fullName: string, userId: number) => {
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
          <a href="${config.urls.frontend}/dashboard" class="button">ورود به پنل کاربری</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject: 'خوش آمدید - ثبت نام موفق', html, userId });
};

export const sendReservationEmail = async (
  to: string,
  fullName: string,
  collectionName: string,
  pieceNumber: number,
  userId: number
) => {
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
          <a href="${config.urls.frontend}/dashboard" class="button">مشاهده رزرو و پرداخت</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject: `رزرو موفق - ${collectionName}`, html, userId });
};

export const sendPaymentConfirmationEmail = async (
  to: string,
  fullName: string,
  orderId: string,
  amount: number,
  txid: string,
  userId: number
) => {
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
          <a href="${config.urls.frontend}/dashboard" class="button">مشاهده جزئیات</a>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">با تشکر،<br>تیم فرش‌های کرمان</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject: 'پرداخت تایید شد', html, userId });
};
