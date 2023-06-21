const get = require('lodash/get');
const forOwn = require('lodash/forOwn');

module.exports = (node, filedsMap) => {
  const res = {};
  forOwn(filedsMap, pick_.bind({ node, res }));
  return res;
};

function pick_(value, filedName) {
  const { node, res } = this;
  res[filedName] = get(node, value);
}
