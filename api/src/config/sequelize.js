const { Sequelize } = require('sequelize');
const { pg, isProductionEnv, logDB } = require('./vars');
const logger = require('./logger');

module.exports = new Promise(async (resolve, reject) => {
  let connection;
  //
  try {
    connection = new Sequelize(pg, {
      logging: isProductionEnv ? logger.info.bind(logger) : (logDB && console.log.bind(console)),
    });
    // throw if no connection
    await connection.authenticate();
    //
    return resolve(connection);
  } catch (error) {
    reject(error);
  }
});
