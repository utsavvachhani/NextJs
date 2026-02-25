import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp, name = "User") => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fitnezz Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Fitnezz Account Verification - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          
          <h2 style="color: #2c3e50; text-align: center;">Welcome to Fitnezz 💪</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for choosing <b>Fitnezz</b>. To complete your verification process, please use the One-Time Password (OTP) below:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #27ae60;">
              ${otp}
            </span>
          </div>
          
          <p><b>This OTP is valid for 10 minutes.</b></p>
          
          <p style="color: red; font-weight: bold;">
            🔒 Do NOT share this OTP with anyone. Fitnezz will never ask for your OTP via phone, email, or message.
          </p>
          
          <hr style="margin: 20px 0;" />
          
          <p style="font-size: 14px; color: #555;">
            If you did not request this verification, please ignore this email or contact our support team immediately.
          </p>
          
          <p>Stay strong,<br/>
          <b>Team Fitnezz</b></p>
          
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};
