
# 😈 devil-backend-nodejs

A production-ready Node.js + Express + MongoDB backend boilerplate CLI with built-in utilities for backend and frontend.

[![npm version](https://img.shields.io/npm/v/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![npm downloads](https://img.shields.io/npm/dm/devil-backend-nodejs.svg)](https://www.npmjs.com/package/devil-backend-nodejs)
[![license](https://img.shields.io/npm/l/devil-backend-nodejs.svg)](https://github.com/Sachint122/devil-backend-nodejs/blob/main/LICENSE)

---

## 🚀 Quick Start

```bash
npx devil-backend-nodejs my-app
```

## ⚡ With Flags (Skip Prompts)

```bash
npx devil-backend-nodejs my-app --cloudinary
npx devil-backend-nodejs my-app --email-gmail
npx devil-backend-nodejs my-app --email-brevo
npx devil-backend-nodejs my-app --razorpay
npx devil-backend-nodejs my-app --stripe
npx devil-backend-nodejs my-app --docker
npx devil-backend-nodejs my-app --cloudinary --email-brevo --razorpay --docker
npx devil-backend-nodejs my-app --no-install
npx devil-backend-nodejs --help
```

---

## 🔧 CLI Flags

| Flag | Description |
|------|-------------|
| `--cloudinary` | Add Cloudinary file upload + env variables |
| `--email-gmail` | Add Gmail SMTP + env variables |
| `--email-brevo` | Add Brevo email + env variables |
| `--razorpay` | Add Razorpay payment + env variables |
| `--stripe` | Add Stripe payment + env variables |
| `--docker` | Add Docker + docker-compose support |
| `--no-install` | Skip npm install |
| `--help, -h` | Show help menu |

---

## 📁 Generated Project Structure

```
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

## 📦 Install Package

```bash
npm install devil-backend-nodejs
```

---

## 🛠️ Backend Utilities (CommonJS)

```js
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
```

| Utility | Description | Example |
|---------|-------------|---------|
| `asyncHandler` | Wrap async controllers | `asyncHandler(async (req, res) => {})` |
| `paginate` | MongoDB pagination | `await paginate(Model, query, { page, limit })` |
| `ApiError` | Standard error class | `new ApiError(404, 'Not found')` |
| `ApiResponse` | Standard response class | `new ApiResponse(200, data, 'Success')` |
| `generateToken` | Generate JWT token | `generateToken(userId)` |
| `generateOTP` | 6 digit OTP | `generateOTP()` |
| `randomString` | Random string | `randomString(32)` |
| `slugify` | Text to URL slug | `slugify('Hello World')` → `hello-world` |
| `capitalize` | Capitalize string | `capitalize('hello')` → `Hello` |
| `capitalizeWords` | Capitalize all words | `capitalizeWords('hello world')` |
| `formatDate` | Format date | `formatDate(new Date())` → `21 Mar 2026` |
| `timeAgo` | Relative time | `timeAgo('2026-03-20')` → `1 day ago` |
| `pick` | Pick object fields | `pick(req.body, ['name', 'email'])` |
| `exclude` | Exclude object fields | `exclude(user, ['password'])` |
| `isEmptyObject` | Check empty object | `isEmptyObject({})` → `true` |
| `calculatePagination` | Pagination meta | `calculatePagination(100, 2, 10)` |
| `validateEnv` | Validate env vars | `validateEnv(['JWT_SECRET', 'MONGO_URI'])` |

---

## ☁️ Cloudinary Helper

Set env variables:
```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

```js
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
  'documents'   // folder name
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
```

---

## 💳 Razorpay Helper

Set env variables:
```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

```js
const { createOrder, verifyPayment, getRazorpay } = require('devil-backend-nodejs');

// Create order
const order = await createOrder(499, 'INR');

// Verify payment
const isValid = verifyPayment(orderId, paymentId, signature);

// Raw instance
const razorpay = getRazorpay();
```

---

## 💳 Stripe Helper

Set env variables:
```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

```js
const { createPaymentIntent, constructWebhookEvent, getStripe } = require('devil-backend-nodejs');

// Create payment intent
const intent = await createPaymentIntent(499, 'inr');

// Verify webhook
const event = constructWebhookEvent(req.body, req.headers['stripe-signature']);

// Raw instance
const stripe = getStripe();
```

---

## 📧 Gmail Helper

Set env variables:
```env
GMAIL_USER=
GMAIL_PASS=
```

```js
const { sendGmail, sendOTPGmail, sendWelcomeGmail } = require('devil-backend-nodejs');

// Custom email
await sendGmail('user@gmail.com', 'Subject', '<h1>Hello!</h1>');

// OTP email
await sendOTPGmail('user@gmail.com', '123456');

// Welcome email
await sendWelcomeGmail('user@gmail.com', 'Sachin');
```

---

## 📧 Brevo Helper

Set env variables:
```env
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
```

```js
const { sendBrevo, sendOTPBrevo, sendWelcomeBrevo } = require('devil-backend-nodejs');

// Custom email
await sendBrevo('user@gmail.com', 'Subject', '<h1>Hello!</h1>');

// OTP email
await sendOTPBrevo('user@gmail.com', '123456');

// Welcome email
await sendWelcomeBrevo('user@gmail.com', 'Sachin');
```

---

## 🌐 Frontend Hooks (ESM — React / Next.js / Vite)

```js
import {
  useApi,
  useOptimistic,
  useFetch,
  useDebounce,
  useInfiniteScroll,
  useToggle,
  useClickOutside,
} from 'devil-backend-nodejs';
```

---

### `useApi` — API Calls

```js
const { get, post, patch, put, del } = useApi('http://localhost:5000/api');

await get('/users');
await post('/users', { name: 'Sachin' });
await patch('/users/123', { status: 'active' });
await del('/users/123');
```

---

### `useOptimistic` — Optimistic UI

UI pehle update hoti hai, API baad mein. Fail hone par revert!

```js
const { data: cart, optimisticUpdate } = useOptimistic(initialCart);

// Update
await optimisticUpdate(
  id,
  { quantity: 2 },
  () => patch(`/cart/${id}`, { quantity: 2 })
);

// Delete
await optimisticUpdate(
  id,
  null,
  () => del(`/cart/${id}`)
);
```

---

### `useFetch` — Auto Fetch on Mount

```js
const { data, loading, error, refetch } = useFetch('/users');

if (loading) return <p>Loading...</p>
if (error)   return <p>{error}</p>

return <button onClick={refetch}>🔄 Refresh</button>
```

---

### `useDebounce` — Debounced Function

```js
const [search, setSearch] = useState('');

const handleSearch = useDebounce(async (query) => {
  const data = await get(`/users?search=${query}`);
}, 500);

<input
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  }}
/>
```

---

### `useInfiniteScroll` — Infinite Scroll

```js
const [posts, setPosts] = useState([]);

const { loading, hasMore, lastElementRef } = useInfiniteScroll(
  '/posts',   // url
  setPosts,   // apna setState
  10          // limit (optional, default 10)
);

return (
  <div>
    {posts.map((post, i) => (
      <div
        key={post._id}
        ref={i === posts.length - 1 ? lastElementRef : null}
      >
        {post.title}
      </div>
    ))}
    {loading  && <p>⏳ Loading...</p>}
    {!hasMore && <p>✅ Sab load ho gaya!</p>}
  </div>
);
```

---

### `useToggle` — Toggle State

```js
const { state: isOpen, toggle, open, close } = useToggle();

<button onClick={open}>Open</button>
{isOpen && <div>Dialog!</div>}
<button onClick={close}>Close</button>
```

---

### `useClickOutside` — Click Outside to Close

```js
const { state: isOpen, open, close } = useToggle();
const { patch } = useApi('http://localhost:5000/api');

const { ref } = useClickOutside(close, {
  apiFn:      () => patch(`/events/${id}`, { status }),
  setData:    setStatus,
  revertData: prevStatus,
});

{isOpen && (
  <div ref={ref} className="dialog">
    Dialog content here...
  </div>
)}
```

---

## 👤 Author

**Sachin Tiwari**
- GitHub: [@Sachint122](https://github.com/Sachint122)
- npm: [devil-backend-nodejs](https://www.npmjs.com/package/devil-backend-nodejs)

---

## 📄 License

MIT © Sachin Tiwari
