const reduce = require('lodash/reduce');
const hasOwn = require('./has-own');

const groupByCount = (collection) =>
  reduce(
    collection,
    (res, current) => {
      if (hasOwn(res, current)) {
        res[current] += 1;
      } else {
        res[current] = 1;
      }
      return res;
    },
    {}
  );

module.exports = groupByCount;
