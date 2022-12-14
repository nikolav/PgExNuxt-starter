const { param } = require('express-validator');

module.exports = {
  storage: [param('fileID').exists()],
};
