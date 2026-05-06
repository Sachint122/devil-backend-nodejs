# 🚀 devil-backend-nodejs

A production-ready Node.js + Express + MongoDB backend boilerplate CLI with built-in utilities and common helper functions.

[![npm version](https://img.shields.io/npm/v/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![npm downloads](https://img.shields.io/npm/dm/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![license](https://img.shields.io/npm/l/devil-backend-nodejs.svg)](https://github.com/Sachint122/devil-backend-nodejs/blob/main/LICENSE)

---

## ⚡ Quick Start

Scaffold a new backend project in seconds:

```bash
npx devil-backend-nodejs my-app
```

## 🛠️ CLI Flags (Skip Prompts)

Customize your project structure directly from the command line:

```bash
# Add specific features
npx devil-backend-nodejs my-app --cloudinary
npx devil-backend-nodejs my-app --email-gmail
npx devil-backend-nodejs my-app --email-brevo
npx devil-backend-nodejs my-app --razorpay
npx devil-backend-nodejs my-app --stripe
npx devil-backend-nodejs my-app --docker

# Combine multiple features
npx devil-backend-nodejs my-app --cloudinary --email-brevo --razorpay --docker

# Other options
npx devil-backend-nodejs my-app --no-install
npx devil-backend-nodejs --help
```

---

## 📋 Features

- **Standardized API Responses**: Built-in `ApiError` and `ApiResponse` classes.
- **Async Handling**: `asyncHandler` to eliminate try-catch blocks in controllers.
- **Authentication**: JWT-based auth with middleware.
- **Database**: Mongoose configuration with pagination support.
- **Security**: Pre-configured Helmet, CORS, Rate Limiting, and HPP.
- **Integrations**: Easy setup for Cloudinary, Razorpay, Stripe, Gmail, and Brevo.
- **Docker Support**: Optional Docker and Docker Compose configuration.

---

## 🏗️ Generated Project Structure

```text
my-app/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── constants.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandlerMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── roleCheckMiddleware.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── index.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── generateToken.js
│   └── validators/
│       └── authValidator.js
├── app.js
├── server.js
├── .env
└── package.json
```

---

## 📦 Install as a Utility Package

You can also use the utilities and helpers in your existing projects:

```bash
npm install devil-backend-nodejs
```

### 🛠️ Backend Utilities

#### commonJS
```javascript
const { asyncHandler, ApiError } = require('devil-backend-nodejs');
```

#### ESM / TypeScript
```javascript
import { asyncHandler, ApiError } from 'devil-backend-nodejs';
```

| Utility | Description | Example |
| :--- | :--- | :--- |
| `asyncHandler` | Wrap async controllers | `asyncHandler(async (req, res) => {})` |
| `paginate` | MongoDB pagination | `await paginate(Model, query, { page, limit })` |
| `ApiError` | Standard error class | `new ApiError(404, 'Not found')` |
| `ApiResponse` | Standard response class | `new ApiResponse(200, data, 'Success')` |
| `generateToken` | Generate JWT token | `generateToken(userId)` |
| `generateOTP` | 6 digit OTP | `generateOTP()` |
| `randomString` | Random string | `randomString(32)` |
| `slugify` | Text to URL slug | `slugify('Hello World')` -> `hello-world` |
| `capitalize` | Capitalize string | `capitalize('hello')` -> `Hello` |
| `capitalizeWords` | Capitalize all words | `capitalizeWords('hello world')` |
| `formatDate` | Format date | `formatDate(new Date())` -> `21 Mar 2026` |
| `timeAgo` | Relative time | `timeAgo('2026-03-20')` -> `1 day ago` |
| `pick` | Pick object fields | `pick(req.body, ['name', 'email'])` |
| `exclude` | Exclude object fields | `exclude(user, ['password'])` |
| `isEmptyObject` | Check empty object | `isEmptyObject({})` -> `true` |
| `calculatePagination` | Pagination meta | `calculatePagination(100, 2, 10)` |
| `validateEnv` | Validate env vars | `validateEnv(['JWT_SECRET', 'MONGO_URI'])` |

---

## ☁️ Cloudinary Helper

Set env variables:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```javascript
const {
  uploadToCloudinary,
  uploadImageToCloudinary,
  deleteFromCloudinary,
} = require('devil-backend-nodejs');

// File upload (pdf, doc etc)
const file = await uploadToCloudinary(buffer, originalname, mimetype, 'documents');

// Image upload
const img = await uploadImageToCloudinary(buffer, originalname, mimetype, 'avatars');

// Delete
await deleteFromCloudinary(publicId);
```

---

## 💳 Payment Helpers

### Razorpay
Set env variables:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

```javascript
const { createOrder, verifyPayment } = require('devil-backend-nodejs');

// Create order
const order = await createOrder(499, 'INR');

// Verify payment
const isValid = verifyPayment(orderId, paymentId, signature);
```

### Stripe
Set env variables:
```env
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

```javascript
const { createPaymentIntent, constructWebhookEvent } = require('devil-backend-nodejs');

// Create payment intent
const intent = await createPaymentIntent(499, 'inr');

// Verify webhook
const event = constructWebhookEvent(req.body, req.headers['stripe-signature']);
```

---

## 📧 Email Helpers

### Gmail (SMTP)
```env
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

```javascript
const { sendGmail, sendOTPGmail, sendWelcomeGmail } = require('devil-backend-nodejs');

await sendGmail('user@gmail.com', 'Subject', '<h1>Hello!</h1>');
await sendOTPGmail('user@gmail.com', '123456');
await sendWelcomeGmail('user@gmail.com', 'Sachin');
```

### Brevo
```env
BREVO_API_KEY=your_api_key
BREVO_SENDER_EMAIL=your_verified_email
BREVO_SENDER_NAME=your_name
```

```javascript
const { sendBrevo, sendOTPBrevo, sendWelcomeBrevo } = require('devil-backend-nodejs');

await sendBrevo('user@gmail.com', 'Subject', '<h1>Hello!</h1>');
await sendOTPBrevo('user@gmail.com', '123456');
await sendWelcomeBrevo('user@gmail.com', 'Sachin');
```

---

## 📱 Frontend Package

For React hooks and frontend helpers, use our companion package:

```bash
npm install devil-frontend
```

[![npm version](https://img.shields.io/npm/v/devil-frontend.svg)](https://www.npmjs.com/package/devil-frontend)

---

## 👤 Author

**Sachin Tiwari**
- GitHub: [@Sachint122](https://github.com/Sachint122)
- npm: [devil-backend-nodejs](https://www.npmjs.com/package/devil-backend-nodejs)

---

## 📄 License

MIT © Sachin Tiwari
