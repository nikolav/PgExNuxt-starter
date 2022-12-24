const chalk = require('chalk');
const model = require('../../../models/sequelize');

module.exports = (cmdMessage) => {
  cmdMessage
    .command('clear')
    .description('clear @messages table')
    // eslint-disable-next-line no-unused-vars
    .action(async (_command) => {
      const { Message } = await model;
      await Message.destroy({ truncate: true });
      console.log(chalk.green(`@messages table cleared`));
    });
};
