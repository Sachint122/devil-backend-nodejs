const SibApiV3Sdk = require('sib-api-v3-sdk');

let apiInstance = null;

if (process.env.BREVO_API_KEY) {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
  apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
}

const sendEmail = async (to, subject, htmlContent) => {
  if (!apiInstance) {
    console.log(`📧 [SKIPPED] Email to ${to}: ${subject}`);
    return { message: 'Email skipped - BREVO_API_KEY not set' };
  }

  try {
    const mail = new SibApiV3Sdk.SendSmtpEmail();
    mail.sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: process.env.BREVO_SENDER_NAME || 'App',
    };
    mail.to = [{ email: to }];
    mail.subject = subject;
    mail.htmlContent = htmlContent;

    const result = await apiInstance.sendTransacEmail(mail);
    return result;
  } catch (error) {
    console.error('❌ Brevo email error:', error.message);
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
