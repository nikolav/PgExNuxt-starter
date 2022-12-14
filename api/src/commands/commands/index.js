const configureCommands = (program) => {
  require('./log-time')(program);
  require('./db-seed')(program);
};
//
module.exports = configureCommands;
