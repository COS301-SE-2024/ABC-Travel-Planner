// Example configuration using Gmail SMTP
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['POST'] });
  }

  const { email } = req.body;

  try {
    // Create transporter with SMTP settings
    let transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 25,
        secure: true, // Use SSL/TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Subject of the email',
      text: 'Body of the email',
    });

    console.log('Email sent:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
