const { isEmpty } = require('validator');
const pickValues = require('../../../utils/pick-values');
// eslint-disable-next-line no-unused-vars
module.exports = (source, args, context, info) => {
  const [content] = pickValues(args, 'content');
  return [
    { check: isEmpty, value: content, is: false, args: [] },
    // { check: isEmpty, value: content, is: false, args: [] },
  ].every(passesValidator_);
};

function passesValidator_({ check, value, is, args }) {
  return is === check(value, ...args);
}
