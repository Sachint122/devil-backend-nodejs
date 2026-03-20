# 😈 Devil Backend - Node.js

A production-ready Node.js + Express + MongoDB backend boilerplate with JWT authentication, role-based access control, and scalable folder structure.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Fill in your values in .env

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

---

## 📁 Project Structure

```
project/
├── src/
│   ├── config/
│   │   ├── db.js               → MongoDB connection
│   │   └── constants.js        → App-wide constants
│   ├── controllers/
│   │   └── authController.js   → Auth logic (register, login, etc.)
│   ├── routes/
│   │   ├── index.js            → Central route registrar
│   │   └── authRoutes.js       → Auth routes
│   ├── models/
│   │   └── userModel.js        → User Mongoose schema
│   ├── middleware/
│   │   ├── authMiddleware.js        → JWT verify, protect route
│   │   ├── roleCheckMiddleware.js   → Role-based access control
│   │   ├── errorHandlerMiddleware.js→ Global error handler
│   │   └── rateLimiter.js          → Rate limiting
│   ├── utils/
│   │   ├── ApiResponse.js      → Standardized success response
│   │   ├── ApiError.js         → Custom error class
│   │   └── generateToken.js    → JWT token generator & cookie setter
│   ├── validators/
│   │   └── authValidator.js    → Request validation rules
│   ├── services/               → Business logic (add as needed)
│   └── constants/              → Extra constants (add as needed)
├── server.js                   → App entry point
├── app.js                      → Express setup & middleware
├── .env                        → Environment variables
├── .env.example                → Environment variable template
├── .gitignore                  → Git ignore rules
└── README.md                   → Project documentation
```

---

## 🔐 Auth API Routes

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/auth/logout` | Private | Logout user |
| GET | `/api/auth/me` | Private | Get logged-in user |
| POST | `/api/auth/refresh-token` | Public | Refresh access token |
| POST | `/api/auth/forgot-password` | Public | Generate reset token |
| POST | `/api/auth/reset-password/:token` | Public | Reset password |
| PUT | `/api/auth/change-password` | Private | Change password |
| PUT | `/api/auth/update-profile` | Private | Update profile |

---

## 🔑 JWT Strategy

- **Access Token** → expires in `15m`, stored in `httpOnly` cookie + response body
- **Refresh Token** → expires in `7d`, stored in `httpOnly` cookie + DB
- On access token expiry → call `/api/auth/refresh-token` to get new one

---

## 🛡️ Protecting Routes

```js
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheckMiddleware');

// Login required
router.get('/profile', protect, getProfile);

// Admin only
router.delete('/user/:id', protect, checkRole('admin'), deleteUser);

// Admin or Moderator
router.put('/post/:id', protect, checkRole('admin', 'moderator'), updatePost);
```

---

## 📦 ApiResponse Usage

```js
// String response
res.status(200).json(new ApiResponse(200, 'Deleted successfully'));

// Object response (spreads all properties)
res.status(200).json(new ApiResponse(200, { message: 'Success', user, token }));
```

---

## ❌ ApiError Usage

```js
// Simple error
throw new ApiError(404, 'User not found');

// Array of errors
throw new ApiError(400, ['Email is required', 'Password is required']);

// Error with message + array
throw new ApiError(400, 'Validation failed', ['Email is required']);

// Object errors
throw new ApiError(400, { email: 'Email already exists' });
```

---

## 📄 Pagination Usage

```js
const { paginate } = require('devil-backend-nodejs');

const result = await paginate(User, { role: 'user' }, req.query);

// req.query supports:
// ?page=1&limit=10&sort=-createdAt

// Returns:
// {
//   data: [...],
//   currentPage: 1,
//   totalPages: 5,
//   totalItems: 48,
//   hasNextPage: true,
//   hasPrevPage: false,
//   limit: 10
// }
```

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT secret key |
| `JWT_EXPIRES_IN` | JWT expiry (default: 7d) |
| `FRONTEND_URL` | Frontend URL for CORS |

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `dotenv` | Environment variables |
| `jsonwebtoken` | JWT auth |
| `bcryptjs` | Password hashing |
| `express-rate-limit` | Rate limiting |
| `express-validator` | Request validation |
| `cors` | Cross-Origin requests |
| `helmet` | Secure HTTP headers |
| `cookie-parser` | Cookie parsing |
| `compression` | Gzip compression |
| `hpp` | HTTP parameter pollution prevention |
| `multer` | File uploads |
| `morgan` | HTTP request logger |

---

## 🔧 Scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 👨‍💻 Author

Built with 😈 by **Sachin Tiwari**
