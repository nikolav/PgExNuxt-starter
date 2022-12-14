const logger = require('../../logger');
const moment = require('moment-timezone');

module.exports = () =>
  logger.info(`@scheduler.onTick.logDate | ${moment()}`);
