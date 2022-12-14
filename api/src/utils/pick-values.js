const reduce = require('lodash/reduce');
const get = require('lodash/get');
//
module.exports = (node, ...fields) =>
  reduce(fields, pickBy_.bind(node), []);
//
// eslint-disable-next-line no-unused-vars
function pickBy_(accumulator, valueField, _index, _collection) {
  accumulator.push(get(this, valueField));
  return accumulator;
}
