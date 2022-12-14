// eslint-disable-next-line no-unused-vars
const { param, body, query, oneOf } = require('express-validator');
//
module.exports = {
  // list: [
  //   oneOf([
  //     [body('limit').isBoolean(), body('count').isNumeric()],
  //     query('limit').isNumeric(),
  //     body('all').isBoolean(),
  //   ]),
  // ],
  //
  byName: [param('name').exists()],
  upsert: [body('name').exists(), body('value').exists()],
  destroy: [body('id').exists()],
};
