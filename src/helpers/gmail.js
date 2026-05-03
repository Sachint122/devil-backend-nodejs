let transporter = null;

const getTransporter = () => {
  if (!transporter && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const nodemailer = require('nodemailer');
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
    } catch (e) {
      throw new Error('Nodemailer package not found! Please install it using: npm install nodemailer');
    }
  }
  return transporter;
};

const sendEmail = async (to, subject, html) => {
  const currentTransporter = getTransporter();
  if (!currentTransporter) {
    console.log(`📧 [SKIPPED] Email to ${to}: ${subject}`);
    return { message: 'Email skipped - GMAIL_USER or GMAIL_PASS not set' };
  }

  try {
    const result = await currentTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to, subject, html,
    });
    return result;
  } catch (error) {
    console.error('❌ Gmail error:', error.message);
    return { error: error.message };
  }
};

const sendOTPEmail = async (to, otp) => {
  return await sendEmail(
    to,
    'Your OTP Code',
    `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`
  );
};

const sendWelcomeEmail = async (to, name) => {
  return await sendEmail(
    to,
    'Welcome!',
    `<h2>Welcome, ${name}! 🎉</h2><p>Thanks for joining us.</p>`
  );
};

module.exports = { sendEmail, sendOTPEmail, sendWelcomeEmail };
