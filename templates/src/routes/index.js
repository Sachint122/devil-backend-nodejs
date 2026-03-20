const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./authRoutes');

// Mount routes
router.use('/auth', authRoutes);

// Add more routes here as your app grows
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);

module.exports = router;
