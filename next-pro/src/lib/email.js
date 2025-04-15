import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // أو 587
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendReplyEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"عيادتك" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });
};
