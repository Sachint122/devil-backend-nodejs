const isEmptyObject = (obj) =>
  obj && typeof obj === 'object' && Object.keys(obj).length === 0;
module.exports = { isEmptyObject };
