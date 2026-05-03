let SibApiV3Sdk = null;
let apiInstance = null;

const getApiInstance = () => {
  if (!apiInstance && process.env.BREVO_API_KEY) {
    try {
      SibApiV3Sdk = require('sib-api-v3-sdk');
      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
      apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    } catch (e) {
      throw new Error('sib-api-v3-sdk package not found! Please install it using: npm install sib-api-v3-sdk');
    }
  }
  return apiInstance;
};

const sendEmail = async (to, subject, htmlContent) => {
  const currentApiInstance = getApiInstance();
  if (!currentApiInstance) {
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

    const result = await currentApiInstance.sendTransacEmail(mail);
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
