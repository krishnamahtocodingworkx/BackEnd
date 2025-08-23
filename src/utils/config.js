import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;

export const PORT = process.env.PORT || 9000;
export const JWT_SECRET = process.env.JWT_SECRET;

export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
