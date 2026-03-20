/**
 * devil-backend-nodejs
 * Importable utilities for use in existing projects
 *
 * Usage:
 * const { ApiError, ApiResponse, asyncHandler, paginate } = require('devil-backend-nodejs');
 */

const ApiError = require('./src/utils/ApiError');
const ApiResponse = require('./src/utils/ApiResponse');
const asyncHandler = require('./src/helpers/asyncHandler');
const paginate = require('./src/helpers/paginate');
const { generateAccessToken, generateRefreshToken, setTokenCookies } = require('./src/utils/generateToken');
const connectDB = require('./src/config/db');
const constants = require('./src/config/constants');
const errorHandler = require('./src/middleware/errorHandlerMiddleware');
const { protect } = require('./src/middleware/authMiddleware');
const checkRole = require('./src/middleware/roleCheckMiddleware');
const { globalLimiter, authLimiter, passwordResetLimiter } = require('./src/middleware/rateLimiter');

module.exports = {
  // Utils
  ApiError,
  ApiResponse,

  // Helpers
  asyncHandler,
  paginate,

  // Token
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,

  // Database
  connectDB,

  // Constants
  constants,

  // Middleware
  errorHandler,
  protect,
  checkRole,
  globalLimiter,
  authLimiter,
  passwordResetLimiter,
};
