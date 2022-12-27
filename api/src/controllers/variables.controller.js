
const httpStatus = require('http-status');

const model = require('../models/sequelize');
const { useIO } = require('../config/io');
const { IOEVENT_VARIABLES_CHANGE, IOEVENT_LIKES_CHANGE, LIKES_PREFIX } = require('../config/vars');

const ioNotifyChange = () => useIO((io) => io.emit(IOEVENT_VARIABLES_CHANGE));
const ioNotifyLikesChange = (topicID) => useIO(io => io.emit(`${IOEVENT_LIKES_CHANGE}:${topicID}`));
//
module.exports = {
  // eslint-disable-next-line no-unused-vars
  list: async (req, res, next) => {
    const { Main } = await model;
    const data = await Main.findAll();
    return res.json(data);
  },
  // eslint-disable-next-line no-unused-vars
  findOneByName: async (req, res, next) => {
    const { name } = req.params;
    const { Main } = await model;
    const data = await Main.findOne({ where: { name } });
    //
    return res.json(data);
  },
  // eslint-disable-next-line no-unused-vars
  upsert: async (req, res, next) => {
    const { name, value } = req.body;

    const { Main } = await model;
    let node = await Main.findOne({ where: { name } });
    if (node) {
      await Main.update({ value }, { where: { id: node.id } });
      await node.reload();
    } else {
      node = await Main.create({ name, value });
    }

    res.status(httpStatus.CREATED).json(node);

    ioNotifyChange();
    if (String(name).startsWith(LIKES_PREFIX))
      ioNotifyLikesChange(name.slice(LIKES_PREFIX.length));
  },
  // eslint-disable-next-line no-unused-vars
  destroy: async (req, res, next) => {
    const { id } = req.body;

    const { Main } = await model;
    const rowsDeleted = await Main.destroy({ where: { id } });

    res.json({ rowsDeleted });
    if (0 < rowsDeleted)
      ioNotifyChange();
  },
};
