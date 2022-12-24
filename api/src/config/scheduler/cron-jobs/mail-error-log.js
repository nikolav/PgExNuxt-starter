const mailer = require('../../../services/emails/emailProvider');
const { adminEmail, LOGS_PATH, ERROR_LOG } = require('../../vars');
const { join: pathJoin } = require('path');
const { readFileSync } = require('fs');

module.exports = () =>
  mailer.sendMail({
    message: {
      to: adminEmail,
      subject: `error-log@scheduler.app`,
    },
    locals: {
      message: readFileSync(pathJoin(LOGS_PATH, ERROR_LOG)),
    },
  });
