const winston = require('winston');
const {
  isProductionEnv,
  LOGS_PATH,
  ERROR_LOG,
  COMBINED_LOG,
} = require('./vars');

// eslint-disable-next-line no-unused-vars
// const levels = {
//   error   : 0,
//   warn    : 1,
//   info    : 2,
//   http    : 3,
//   verbose : 4,
//   debug   : 5,
//   silly   : 6
// };

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  silent: false,

  transports: [
    new winston.transports.File({
      filename: `${LOGS_PATH}/${ERROR_LOG}`,
      level: 'error',
    }),

    new winston.transports.File({
      filename: `${LOGS_PATH}/${COMBINED_LOG}`,
    }),
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (!isProductionEnv) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
