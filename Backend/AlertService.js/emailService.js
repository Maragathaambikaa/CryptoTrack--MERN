import nodemailer from 'nodemailer';

/**
 * 🚀 Send Email Notification
 * @param {string} to - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The body text of the email
 */
export const sendEmailNotification = (to, subject, text) => {
  // Create a transporter object using the default SMTP transport (Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service (you can change this for other services like SendGrid, Mailgun, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address (from .env)
      pass: process.env.EMAIL_PASS, // Your Gmail password (from .env or use app password)
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address (same as 'user' above)
    to: to, // Recipient's email address
    subject: subject, // Subject of the email
    text: text, // Body of the email
  };

  // Send email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
