const rateLimit = require('express-rate-limit');
const { merge } = require('lodash');

// https://www.npmjs.com/package/express-rate-limit
const limiterDefaults = {
  // Limit each IP to 10 requests per `window`
  max: 10,
  // 1 minute
  windowMs: 1 * 60 * 1000,
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  // Disable the `X-RateLimit-*` headers
  legacyHeaders: false,
  // // default rate-limiter message
  message:
    'Too many requests received from this IP. You can only make 10 requests every minute.',
};

const rateLimit_1perMinute = rateLimit(
  merge({}, limiterDefaults, {
    max: 1,
    message:
      'Too many requests received from this IP. You can only make 1 request every minute.',
  })
);
const rateLimit_10perMinute = rateLimit(merge({}, limiterDefaults));

module.exports = {
  rateLimit_10perMinute,
  rateLimit_1perMinute,
};
