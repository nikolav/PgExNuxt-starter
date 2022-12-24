
module.exports = (program) => {
  const cmdMessage = program.command('messages');
  require('./clear')(cmdMessage);
  require('./list')(cmdMessage);
};
