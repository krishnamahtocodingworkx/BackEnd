import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "./config.js";

export const mailSender = async (email, title, body) => {
  try {
    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error("SMTP credentials are missing. Check your .env file.");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS, // Use an App Password if 2FA is enabled
      },
    });

    let info = await transporter.sendMail({
      from: "Plant Book ",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (e) {
    console.log("error in mail send", e);
  }
};
if (process.env.NODE_ENV !== "production") {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS, // Use an App Password if 2FA is enabled
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("✅ SMTP Server is ready");
    }
  });
}
