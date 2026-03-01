// utils/sendOtpEmail.js

import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"TPM Support" <${process.env.EMAIL_USER}>`, // Added a display name
    to: email,
    subject: `${otp} is your TPM verification code`, // Leading with the OTP helps mobile users see it in notifications
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verification Code</h2>
        <p style="font-size: 16px; color: #555;">To finish logging in to your TPM account, please use the following One-Time Password (OTP):</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">${otp}</span>
        </div>
        
        <p style="font-size: 14px; color: #888; text-align: center;">
          This code is valid for <strong>5 minutes</strong>.<br>
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          © ${new Date().getFullYear()} TPM Inc. All rights reserved.
        </p>
      </div>
    `
});
};