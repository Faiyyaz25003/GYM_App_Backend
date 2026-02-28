import nodemailer from "nodemailer";

export const sendEmail = async (to, password) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Gym Login Credentials",
    html: `
      <h2>Welcome to Gym</h2>
      <p>Email: ${to}</p>
      <p>Password: ${password}</p>
    `,
  });
};