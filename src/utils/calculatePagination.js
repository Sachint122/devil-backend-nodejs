const calculatePagination = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNext: page < Math.ceil(total / limit),
  hasPrev: page > 1,
});
module.exports = { calculatePagination };
