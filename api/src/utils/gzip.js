const { gzipSync, gunzipSync } = require('zlib');

module.exports = {
  zip: (dataUnzipped) => {
    const bufferZipped = gzipSync(dataUnzipped);
    const dataZipped = bufferZipped.toString('base64');
    return dataZipped;
  },
  unzip: (dataZipped) => {
    const bufferGzipped = Buffer.from(dataZipped, 'base64');
    const bufferUnzipped = gunzipSync(bufferGzipped);
    const dataUnzipped = bufferUnzipped.toString();
    return dataUnzipped;
  },
};
