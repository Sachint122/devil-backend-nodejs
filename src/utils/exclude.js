const exclude = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
module.exports = { exclude };
