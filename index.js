const { asyncHandler }        = require('./src/utils/asyncHandler.js');
const { paginate }            = require('./src/utils/paginate.js');
const { ApiError }            = require('./src/utils/ApiError.js');
const { ApiResponse }         = require('./src/utils/ApiResponse.js');
const { generateToken }       = require('./src/utils/generateToken.js');
const { generateOTP }         = require('./src/utils/generateOTP.js');
const { randomString }        = require('./src/utils/randomString.js');
const { validateEnv }         = require('./src/utils/validateEnv.js');
const { calculatePagination } = require('./src/utils/calculatePagination.js');
const { slugify }             = require('./src/utils/slugify.js');
const { capitalize }          = require('./src/utils/capitalize.js');
const { capitalizeWords }     = require('./src/utils/capitalizeWords.js');
const { formatDate }          = require('./src/utils/formatDate.js');
const { timeAgo }             = require('./src/utils/timeAgo.js');
const { pick }                = require('./src/utils/pick.js');
const { exclude }             = require('./src/utils/exclude.js');
const { isEmptyObject }       = require('./src/utils/isEmptyObject.js');

const { uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary, getCloudinary }        = require('./src/helpers/cloudinary.js');
const { createOrder, verifyPayment, getRazorpay }                                                 = require('./src/helpers/razorpay.js');
const { createPaymentIntent, constructWebhookEvent, getStripe }                                   = require('./src/helpers/stripe.js');
const { sendEmail: sendGmail, sendOTPEmail: sendOTPGmail, sendWelcomeEmail: sendWelcomeGmail }     = require('./src/helpers/gmail.js');
const { sendEmail: sendBrevo, sendOTPEmail: sendOTPBrevo, sendWelcomeEmail: sendWelcomeBrevo }     = require('./src/helpers/brevo.js');

module.exports = {
  // Utils
  asyncHandler, paginate, ApiError, ApiResponse,
  generateToken, generateOTP, randomString,
  validateEnv, calculatePagination,
  slugify, capitalize, capitalizeWords,
  formatDate, timeAgo,
  pick, exclude, isEmptyObject,

  // Cloudinary
  uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary, getCloudinary,

  // Razorpay
  createOrder, verifyPayment, getRazorpay,

  // Stripe
  createPaymentIntent, constructWebhookEvent, getStripe,

  // Gmail
  sendGmail, sendOTPGmail, sendWelcomeGmail,

  // Brevo
  sendBrevo, sendOTPBrevo, sendWelcomeBrevo,
};
