import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
  serviceMail: process.env.SERVICE_MAIL,
  serviceMailPort: process.env.SERVICE_MAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export const smsConfig = {
  smsAccount: process.env.TWILIO_ACCOUNT_ID,
  smsToken: process.env.TWILIO_AUTH_TOKEN,
  smsNumber: process.env.TWILIO_SMS_NUMBER,
};
