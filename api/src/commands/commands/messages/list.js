const model = require('../../../models/sequelize');

module.exports = (cmdMessage) => {
  cmdMessage
    .command('list')
    .description('list all @messages')
    // eslint-disable-next-line no-unused-vars
    .action(async (_command) => {
      const { Message } = await model;
      console.log(await Message.findAll({ raw: true }));
    });
};
