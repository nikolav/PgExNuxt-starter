const get = require('lodash/get');
const transform = require('lodash/transform');

module.exports = (node, filedsMap) => transform(filedsMap, get_.bind(node), {});

function get_(res, value, filedName) {
  const node = this;
  res[filedName] = get(node, value);
}
