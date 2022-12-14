const model = require('../models/sequelize');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  findSession: async (req, res, next) => {
    // access validated here, fetch/send session data
    const { session } = req;
    res.json(JSON.parse(session.data));
  },
  // eslint-disable-next-line no-unused-vars
  put: async (req, res, next) => {
    const {
      body: { data },
      session,
    } = req;
    session.data = data;
    await session.save();
    res.json(JSON.parse(session.data));
  },
  // eslint-disable-next-line no-unused-vars
  destroy: async (req, res, next) => {
    const {
      user: { _id },
    } = req;
    const { Session } = await model;
    const rowsDeleted = await Session.destroy({
      where: { user_id: _id.toString() },
    });
    res.json({ rowsDeleted });
  },
};
