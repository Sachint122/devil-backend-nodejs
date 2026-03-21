const validateEnv = (keys = []) => {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing env variables: ${missing.join(', ')}`);
  }
};
module.exports = { validateEnv };
