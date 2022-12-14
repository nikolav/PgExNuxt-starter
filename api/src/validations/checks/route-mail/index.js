// eslint-disable-next-line no-unused-vars
const { body } = require('express-validator');
//
module.exports = {
  textMessage: [
    body('to').isEmail(),
    body('subject').exists(),
    body('message').exists(),
    body('text').optional(),
  ],
};
