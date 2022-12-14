const { EventEmitter } = require('node:events');
const moment = require('moment-timezone');
const { Server: IOServer } = require('socket.io');

const logger = require('./logger');
const { CLIENT_IO, CONFIG_IO } = require('./vars');

let IO = null;
const subs = [];

const ioEmitter = new EventEmitter();
ioEmitter.once('io:online', () =>
  subs.forEach((callback) => callback(IO))
);

// https://socket.io/get-started/chat#integrating-socketio
module.exports = {
  IO: (server) =>
    new Promise((resolve, reject) => {
      try {
        if (null != IO) return resolve(IO);

        IO = new IOServer(server, {
          cors: {
            origin: [CLIENT_IO],
            credentials: true,
          },
        });

        IO.on('connection', (socket) => {
          socket.join(CONFIG_IO.public_channel);
          // socket status check event
          socket.on('status:test', (payload) =>
            socket.emit('status:test', payload)
          );
        });

        resolve(IO);
        ioEmitter.emit('io:online');
      } catch (error) {
        reject(error);
      }

      logger.http(`io.connection:${moment()}:${!!IO}`);
    }),

  useIO: (callback) => (IO ? callback(IO) : subs.push(callback)),
};
