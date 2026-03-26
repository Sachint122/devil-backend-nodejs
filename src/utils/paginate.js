const paginate = async (Model, query = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  // 1. Start the query
  let mongoQuery = Model.find(query);

  // 2. Add Sort logic if provided
  if (options.sort) {
    mongoQuery = mongoQuery.sort(options.sort);
  }

  // 3. Add Populate logic if provided
  if (options.populate) {
    mongoQuery = mongoQuery.populate(options.populate);
  }

  // 4. Execute with skip and limit
  const [data, total] = await Promise.all([
    mongoQuery.skip(skip).limit(limit),
    Model.countDocuments(query),
  ]);

  return {
    data,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
  };
};

module.exports = { paginate };
