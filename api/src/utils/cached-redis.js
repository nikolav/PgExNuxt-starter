const { redis: redisConnection } = require('../config/caching');
const { redis } = require('../config/vars');

module.exports = async ({
  key,
  data = () => Promise.resolve(null),
  decode = JSON.parse.bind(JSON),
  encode = JSON.stringify.bind(JSON),
}) => {
  const client = await redisConnection;
  const cache = await client.get(key);

  // cache exists, parse/return
  if (null != cache) return decode(cache);

  // set new cache
  const dataToCache = await data();
  await client.set(key, encode(dataToCache), { EX: redis.exiration });

  return dataToCache;
};
