const capitalizeWords = (str) =>
  str ? str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : '';
module.exports = { capitalizeWords };
