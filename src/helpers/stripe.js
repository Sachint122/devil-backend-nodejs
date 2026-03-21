let stripe = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

const check = () => {
  if (!stripe) throw new Error('Stripe not configured! Set STRIPE_SECRET_KEY.');
};

const createPaymentIntent = async (amount, currency = 'inr') => {
  check();
  return await stripe.paymentIntents.create({
    amount: amount * 100,
    currency,
  });
};

const constructWebhookEvent = (body, sig) => {
  check();
  return stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
};

const getStripe = () => {
  check();
  return stripe;
};

module.exports = { createPaymentIntent, constructWebhookEvent, getStripe };
