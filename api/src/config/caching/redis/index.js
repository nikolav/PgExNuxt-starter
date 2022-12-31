const { createClient } = require('redis');
const { redis, isProductionEnv } = require('../../vars');
const logger = require('../../logger');

let client = null;

module.exports =
  new Promise(async (resolve, reject) => {
    if (client) return resolve(client);

    try {
      client = createClient({
        url: redis.url,
        password: redis.password,
      });

      client.on('error', (err) =>
        isProductionEnv ? logger.info(err.message) : console.error(err)
      );

      await client.connect();
    } catch (error) {
      return reject(error);
    }

    resolve(client);
  });
