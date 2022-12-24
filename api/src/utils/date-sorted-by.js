
module.exports = (field = "createdAt") => (a, b) => {
  return new Date(b[field]).getTime() - new Date(a[field]).getTime();
};
