/**
 * Async Handler Helper
 * Wraps async controller functions to avoid repetitive try/catch
 *
 * Usage:
 * const getUser = asyncHandler(async (req, res) => {
 *   const user = await User.findById(req.params.id);
 *   res.status(200).json(new ApiResponse(200, { user }));
 * });
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
