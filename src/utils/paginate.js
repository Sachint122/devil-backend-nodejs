const paginate = async (Model, query = {}, options = {}) => {
  const page  = parseInt(options.page)  || 1;
  const limit = parseInt(options.limit) || 10;
  const skip  = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Model.find(query).skip(skip).limit(limit),
    Model.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};
module.exports = { paginate };
