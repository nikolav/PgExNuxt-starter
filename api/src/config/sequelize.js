const { Sequelize } = require('sequelize');
const { pg, isProductionEnv, logDB } = require('./vars');
const logger = require('./logger');

module.exports = (async () => {
  // https://sequelize.org/api/v6/identifiers.html
  // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
  const client = new Sequelize(pg, {
    logging: isProductionEnv ? logger.info.bind(logger) : (logDB && console.log.bind(console)),
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
  });
  // throw if no connection
  await client.authenticate();
  return client;
})();
