const configureCommands = (program) => {
  require('./log-time')(program);
  require('./db-seed')(program);
  require('./messages')(program);
};
//
module.exports = configureCommands;
