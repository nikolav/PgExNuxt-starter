const { redis: connectRedis } = require('../config/caching');
const { redis } = require('../config/vars');

module.exports = async ({
  key,
  data = () => null,
  decode = JSON.parse.bind(JSON),
  encode = JSON.stringify.bind(JSON),
}) => {
  const client = await connectRedis();
  const cache = await client.get(key);

  // cache exists, parse/return
  if (null != cache) return decode(cache);

  // get new string.cache
  const newCache = encode(await data());
  await client.set(key, newCache, { EX: redis.exiration });

  return newCache;
};
