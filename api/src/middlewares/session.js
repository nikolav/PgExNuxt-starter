const httpStatus = require('http-status');
const APIError = require('../errors/api-error');

// throw 403 if provided sessionToken doesnt match the session data
module.exports = (req, res, next) => {
  const { sessionToken } = req.body;
  const { user, session } = req;

  if (!session.verifyToken(user, sessionToken)) {
    throw new APIError({
      status: httpStatus.FORBIDDEN,
      message: 'access denied',
    });
  }

  // token passes
  next();
};
