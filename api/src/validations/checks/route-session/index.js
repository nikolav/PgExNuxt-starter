// eslint-disable-next-line no-unused-vars
const { body } = require('express-validator');
//
module.exports = {
  findSession: [body('sessionToken').exists()],
  putSession: [body('sessionToken').exists(), body('data').exists()],
  destroySession: [body('sessionToken').exists()],
};
