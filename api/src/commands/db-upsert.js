const model = require('../models/sequelize');
const mongoose = require('../config/mongoose');
const User = require('../models/user.model');
const { testId } = require('../utils');
const {
  ROLE_MAIL_SERVICE_ACCESS,
  ROLE_HAS_ALL_POLICIES,
} = require('../config/vars');

(async () => {
  try {
    const { Main, Message, Role, RoleUser, Session } = await model;

    await mongoose.connect();

    // upsert test user
    const userCreds = { email: 'admin@nikolav.rs', password: '122333' };
    const userSecond = {
      email: 'user12@nikolav.rs',
      password: '122333',
    };

    await User.deleteMany({});
    await RoleUser.destroy({ truncate: true });
    await Session.destroy({ truncate: true });

    const user = await User.create(userCreds);
    // eslint-disable-next-line no-unused-vars
    const user2 = await User.create(userSecond);

    const userId = user._id.toString();
    const [role1] = await Role.findOrCreate({
      where: { name: 'role-test' },
    });
    const [role2] = await Role.findOrCreate({
      where: { name: ROLE_MAIL_SERVICE_ACCESS },
    });
    await Role.findOrCreate({ where: { name: ROLE_HAS_ALL_POLICIES } });

    // assign roles to user for testing
    await RoleUser.create({ userId, roleId: role1.id });
    await RoleUser.create({ userId, roleId: role2.id });

    // Main
    [
      { name: 'test', value: 'test' },
      { name: 'app.name', value: 'app' },
      { name: 'admin.email', value: 'admin@nikolav.rs' },
      { name: 'x', value: '1' },
    ].forEach(async (node) => {
      const { name, value } = node;
      const res = await Main.findOne({ where: { name } });
      //
      if (res) {
        await Main.update({ value }, { where: { id: res.id } });
        return;
      }
      //
      await Main.create(node);
    });

    // Message
    [{ content: `test message --${testId()}` }].forEach(
      async (node) => {
        await Message.create(node);
      }
    );
  } catch (error) {
    console.error({ error });
  }
})();
