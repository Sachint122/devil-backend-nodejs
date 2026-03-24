# ?? devil-backend-nodejs

A production-ready Node.js + Express + MongoDB backend boilerplate CLI with built-in utilities.

[![npm version](https://img.shields.io/npm/v/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![npm downloads](https://img.shields.io/npm/dm/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![license](https://img.shields.io/npm/l/devil-backend-nodejs.svg)](https://github.com/Sachint122/devil-backend-nodejs/blob/main/LICENSE)

---

## ?? Quick Start

\\\ash
npx devil-backend-nodejs my-app
\\\

## ? With Flags (Skip Prompts)

\\\ash
npx devil-backend-nodejs my-app --cloudinary
npx devil-backend-nodejs my-app --email-gmail
npx devil-backend-nodejs my-app --email-brevo
npx devil-backend-nodejs my-app --razorpay
npx devil-backend-nodejs my-app --stripe
npx devil-backend-nodejs my-app --docker
npx devil-backend-nodejs my-app --cloudinary --email-brevo --razorpay --docker
npx devil-backend-nodejs my-app --no-install
npx devil-backend-nodejs --help
\\\

---

## ?? CLI Flags

| Flag | Description |
|------|-------------|
| \--cloudinary\ | Add Cloudinary file upload + env variables |
| \--email-gmail\ | Add Gmail SMTP + env variables |
| \--email-brevo\ | Add Brevo email + env variables |
| \--razorpay\ | Add Razorpay payment + env variables |
| \--stripe\ | Add Stripe payment + env variables |
| \--docker\ | Add Docker + docker-compose support |
| \--no-install\ | Skip npm install |
| \--help, -h\ | Show help menu |

---

## ?? Generated Project Structure

\\\
my-app/
+-- src/
�   +-- config/
�   �   +-- db.js
�   �   +-- constants.js
�   +-- controllers/
�   �   +-- authController.js
�   +-- middleware/
�   �   +-- authMiddleware.js
�   �   +-- errorHandlerMiddleware.js
�   �   +-- rateLimiter.js
�   �   +-- roleCheckMiddleware.js
�   +-- models/
�   �   +-- userModel.js
�   +-- routes/
�   �   +-- authRoutes.js
�   �   +-- index.js
�   +-- utils/
�   �   +-- ApiError.js
�   �   +-- ApiResponse.js
�   �   +-- generateToken.js
�   +-- validators/
�       +-- authValidator.js
+-- app.js
+-- server.js
+-- .env
+-- package.json
\\\

---

## ?? Install Package

\\\ash
npm install devil-backend-nodejs
\\\

---

## ??? Backend Utilities (CommonJS)

\\\js
const {
  asyncHandler,
  paginate,
  ApiError,
  ApiResponse,
  generateToken,
  generateOTP,
  randomString,
  slugify,
  capitalize,
  capitalizeWords,
  formatDate,
  timeAgo,
  pick,
  exclude,
  isEmptyObject,
  calculatePagination,
  validateEnv,
} = require('devil-backend-nodejs');
\\\

| Utility | Description | Example |
|---------|-------------|---------|
| \syncHandler\ | Wrap async controllers | \syncHandler(async (req, res) => {})\ |
| \paginate\ | MongoDB pagination | \wait paginate(Model, query, { page, limit })\ |
| \ApiError\ | Standard error class | \
ew ApiError(404, 'Not found')\ |
| \ApiResponse\ | Standard response class | \
ew ApiResponse(200, data, 'Success')\ |
| \generateToken\ | Generate JWT token | \generateToken(userId)\ |
| \generateOTP\ | 6 digit OTP | \generateOTP()\ |
| \
andomString\ | Random string | \
andomString(32)\ |
| \slugify\ | Text to URL slug | \slugify('Hello World')\ ? \hello-world\ |
| \capitalize\ | Capitalize string | \capitalize('hello')\ ? \Hello\ |
| \capitalizeWords\ | Capitalize all words | \capitalizeWords('hello world')\ |
| \ormatDate\ | Format date | \ormatDate(new Date())\ ? \21 Mar 2026\ |
| \	imeAgo\ | Relative time | \	imeAgo('2026-03-20')\ ? \1 day ago\ |
| \pick\ | Pick object fields | \pick(req.body, ['name', 'email'])\ |
| \exclude\ | Exclude object fields | \exclude(user, ['password'])\ |
| \isEmptyObject\ | Check empty object | \isEmptyObject({})\ ? \	rue\ |
| \calculatePagination\ | Pagination meta | \calculatePagination(100, 2, 10)\ |
| \alidateEnv\ | Validate env vars | \alidateEnv(['JWT_SECRET', 'MONGO_URI'])\ |

---

## ?? Cloudinary Helper

Set env variables:
\\\env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
\\\

\\\js
const {
  uploadToCloudinary,
  uploadImageToCloudinary,
  deleteFromCloudinary,
  getCloudinary,
} = require('devil-backend-nodejs');

// File upload (pdf, doc etc)
const file = await uploadToCloudinary(
  req.file.buffer,
  req.file.originalname,
  req.file.mimetype,
  'documents'
);

// Image upload
const img = await uploadImageToCloudinary(
  req.file.buffer,
  req.file.originalname,
  req.file.mimetype,
  'avatars'
);

// Delete
await deleteFromCloudinary(publicId);

// Returns
// { url, publicId, name }
\\\

---

## ?? Razorpay Helper

Set env variables:
\\\env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
\\\

\\\js
const { createOrder, verifyPayment, getRazorpay } = require('devil-backend-nodejs');

// Create order
const order = await createOrder(499, 'INR');

// Verify payment
const isValid = verifyPayment(orderId, paymentId, signature);

// Raw instance
const razorpay = getRazorpay();
\\\

---

## ?? Stripe Helper

Set env variables:
\\\env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
\\\

\\\js
const { createPaymentIntent, constructWebhookEvent, getStripe } = require('devil-backend-nodejs');

// Create payment intent
const intent = await createPaymentIntent(499, 'inr');

// Verify webhook
const event = constructWebhookEvent(req.body, req.headers['stripe-signature']);

// Raw instance
const stripe = getStripe();
\\\

---

## ?? Gmail Helper

Set env variables:
\\\env
GMAIL_USER=
GMAIL_PASS=
\\\

\\\js
const { sendGmail, sendOTPGmail, sendWelcomeGmail } = require('devil-backend-nodejs');

// Custom email
await sendGmail('user@gmail.com', 'Subject', '<h1>Hello!</h1>');

// OTP email
await sendOTPGmail('user@gmail.com', '123456');

// Welcome email
await sendWelcomeGmail('user@gmail.com', 'Sachin');
\\\

---

## ?? Brevo Helper

Set env variables:
\\\env
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
\\\

\\\js
const { sendBrevo, sendOTPBrevo, sendWelcomeBrevo } = require('devil-backend-nodejs');

// Custom email
await sendBrevo('user@gmail.com', 'Subject', '<h1>Hello!</h1>');

// OTP email
await sendOTPBrevo('user@gmail.com', '123456');

// Welcome email
await sendWelcomeBrevo('user@gmail.com', 'Sachin');
\\\

---

## ?? Frontend Package

React hooks aur helpers ke liye alag package use karo:

\\\ash
npm install devil-frontend
\\\

[![npm version](https://img.shields.io/npm/v/devil-frontend.svg)](https://www.npmjs.com/package/devil-frontend)

---
commond 
Get-ChildItem -Recurse | Where-Object { $_.FullName -notmatch "node_modules" } | Select-Object -ExpandProperty FullName

## ?? Author

**Sachin Tiwari**
- GitHub: [@Sachint122](https://github.com/Sachint122)
- npm: [devil-backend-nodejs](https://www.npmjs.com/package/devil-backend-nodejs)

---

## ?? License

MIT � Sachin Tiwari
