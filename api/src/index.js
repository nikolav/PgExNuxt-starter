// eslint-disable-next-line no-global-assign
Promise = require('bluebird');
// const path = require('path');
// const http = require('http');
const fs = require('fs');
const https = require('https');

const { port, env, runScheduler } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const logger = require('./config/logger');
const { IO } = require('./config/io');

mongoose.connect();

// const server = http
//   .createServer(app)
//   .listen(port, () =>
//     logger.info(`server started on port ${port} (${env})`)
//   );

// # self signed ssl certificate
const server =
  https.createServer({
    key: fs.readFileSync('/home/app/cert/key.pem'),
    cert: fs.readFileSync('/home/app/cert/cert.pem')
  }, app)
    .listen(port, () => logger.info(`server started on port ${port} (${env})`));

(async () => await IO(server))();

// setup scheduler service
if (runScheduler) require('./config/scheduler');

module.exports = app;
