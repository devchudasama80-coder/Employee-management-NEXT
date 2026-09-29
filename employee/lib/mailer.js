import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendResetPasswordEmail(to, resetLink) {
  const mailOptions = {
    from: `"Employee Management" <${process.env.SMTP_FROM}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #4F46E5; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
        <p style="color: #888; font-size: 14px; margin-top: 30px;">
          This link will expire in <strong>1 hour</strong>. If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}