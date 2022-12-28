
const { appHost } = require('./vars');
const thisIp = 'http://24.135.171.85';

module.exports = {
  origin: [appHost, thisIp], credentials: true
};
