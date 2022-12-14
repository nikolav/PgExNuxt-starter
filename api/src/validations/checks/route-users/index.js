// eslint-disable-next-line no-unused-vars
const { param } = require('express-validator');
//
module.exports = {
  rolesByUserId: [param('rolesByUserId').exists()],
  usersByRole: [param('usersByRole').exists()],
};
