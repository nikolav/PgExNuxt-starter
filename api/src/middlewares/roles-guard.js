const model = require('../models/sequelize');
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');

module.exports =
  (...roles) =>
  // eslint-disable-next-line no-unused-vars
  async (req, res, next) => {
    try {
      const { user } = req;
      const { RoleUser } = await model;
      const allowed = await RoleUser.matchesRoles(user, roles);
      if (true === allowed) return next();
    } catch (error) {
      // ignore, pass 403 @failed
    }

    next(
      new APIError({
        status: httpStatus.FORBIDDEN,
        message: 'access denied',
      })
    );
  };
