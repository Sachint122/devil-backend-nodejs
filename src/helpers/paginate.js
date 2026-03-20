const constants = require('../config/constants');

/**
 * Pagination Helper for MongoDB queries
 *
 * Usage:
 * const result = await paginate(User, { role: 'user' }, req.query);
 *
 * Query Params:
 * ?page=1       → page number
 * ?limit=10     → items per page
 * ?sort=-createdAt → sorting (- for descending)
 *
 * Returns:
 * {
 *   data: [...],
 *   currentPage: 1,
 *   totalPages: 5,
 *   totalItems: 48,
 *   hasNextPage: true,
 *   hasPrevPage: false,
 *   limit: 10
 * }
 */
const paginate = async (model, query = {}, options = {}) => {
  const page = Math.max(1, parseInt(options.page) || constants.PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(
    parseInt(options.limit) || constants.PAGINATION.DEFAULT_LIMIT,
    constants.PAGINATION.MAX_LIMIT
  );
  const skip = (page - 1) * limit;
  const sort = options.sort || '-createdAt';

  // Run count and data queries in parallel
  const [totalItems, data] = await Promise.all([
    model.countDocuments(query),
    model.find(query).sort(sort).skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    currentPage: page,
    totalPages,
    totalItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    limit,
  };
};

module.exports = paginate;
