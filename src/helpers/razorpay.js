const Razorpay = require('razorpay');
const crypto = require('crypto');

let instance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

const check = () => {
  if (!instance) throw new Error('Razorpay not configured! Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
};

const createOrder = async (amount, currency = 'INR') => {
  check();
  return await instance.orders.create({
    amount: amount * 100,
    currency,
    receipt: `receipt_${Date.now()}`,
  });
};

const verifyPayment = (orderId, paymentId, signature) => {
  check();
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  return expected === signature;
};

const getRazorpay = () => {
  check();
  return instance;
};

module.exports = { createOrder, verifyPayment, getRazorpay };
