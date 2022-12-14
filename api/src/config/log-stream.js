const fs = require('fs');
const path = require('path');
const { ACCESS_LOG, LOGS_PATH } = require('../config/vars');

module.exports = (logPath = ACCESS_LOG) => {
  const stream = fs.createWriteStream(
    path.join(
      // __dirname,
      LOGS_PATH,
      logPath
    ),
    { flags: 'a' }
  );
  return { stream };
};
