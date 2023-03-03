const chalk = require('chalk');
const { faker } = require('@faker-js/faker');
const { hashSync } = require('bcryptjs');
const model = require('../../models/sequelize');
const mongoose = require('../../config/mongoose');
const User = require('../../models/user.model');
const { testId, range, map, clamp } = require('../../utils');
const { MAX_DBSEED_COUNT } = require('../../config/vars');

module.exports = (program) => {
  const dbCmd = program.command('db');
  const dbCmdSeed = dbCmd.command('seed');

  dbCmdSeed
    .command('users')
    .description('seeds users collection')
    .argument('[count]', 'add random users to db', 1)
    // eslint-disable-next-line no-unused-vars
    .action(async (count = 1, command) => {
      const c = clamp(count, 0, MAX_DBSEED_COUNT);
      if (!(0 < c)) return;
      mongoose.connect();

      await User.insertMany(
        map(range(c), () => ({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: hashSync('122333', 1),
        }))
      );

      console.log(chalk.green(`@users table seeded, [${c}] added`));
    });

  dbCmdSeed
    .command('vars')
    .description('seeds main table')
    .argument('[count]', 'add random vars to db', 1)
    // eslint-disable-next-line no-unused-vars
    .action(async (count = 1, command) => {
      const c = clamp(count, 0, MAX_DBSEED_COUNT);
      if (!(0 < c)) return;

      const { Main } = await model;
      await Main.bulkCreate(
        map(range(c), () => ({
          name: `x.${testId()}`,
          value: testId(),
        })),
        {
          validation: true,
        }
      );

      console.log(chalk.green(`@main table seeded, [${c}] added`));
    });

  dbCmdSeed
    .command('messages')
    .description('seeds @messages table')
    .argument('[count]', 'add N random posts @messages', 1)
    // eslint-disable-next-line no-unused-vars
    .action(async (count = 1, command) => {
      const c = clamp(count, 0, MAX_DBSEED_COUNT);
      if (!(0 < c)) return;

      const { Message } = await model;
      await Message.bulkCreate(
        map(range(c), () => ({
          content: `message --${testId()}`,
        }))
      );

      console.log(chalk.green(`@messages table seeded, [${c}] added`));
    });
};
