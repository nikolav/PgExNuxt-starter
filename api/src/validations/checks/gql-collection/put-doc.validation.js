const { isEmpty } = require('validator');
const { pickValues } = require('../../../utils');
// eslint-disable-next-line no-unused-vars
module.exports = (_source, args, _context, _info) => {
  const [jsonData, tag] = pickValues(args, 'd.jsonData', 'd.tag');
  return [
    { check: isEmpty, value: jsonData, is: false, args: [] },
    { check: isEmpty, value: tag, is: false, args: [] },
    // { check: isEmpty, value: content, is: false, args: [] },
  ].every(passesValidator_);
};

function passesValidator_({ check, value, is, args }) {
  return is === check(value, ...args);
}
