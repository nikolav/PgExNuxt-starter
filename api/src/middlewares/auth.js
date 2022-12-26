const httpStatus = require('http-status');
const passport = require('passport');

const User = require('../models/user.model');
const model = require('../models/sequelize');
const APIError = require('../errors/api-error');
const { assign } = require('../utils');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';
//
// https://github.com/jaredhanson/passport/blob/1e8f112bd233dbffb1904d4dd2051780d81b0a22/lib/middleware/authenticate.js#L9
const handleJWT =
  (req, res, next, roles) => async (err, user, info) => {
    const error = err || info;
    const logIn = Promise.promisify(req.logIn);
    const apiError = new APIError({
      message: error ? error.message : 'Unauthorized',
      status: httpStatus.UNAUTHORIZED,
      stack: error ? error.stack : undefined,
    });

    try {
      if (error || !user) throw error;
      await logIn(user, { session: false });
    } catch (e) {
      return next(apiError);
    }

    const { id } = user;
    if (roles === LOGGED_USER) {
      if (user.role !== 'admin' && req.params.userId !== id) {
        apiError.status = httpStatus.FORBIDDEN;
        apiError.message = 'Forbidden';
        return next(apiError);
      }
    } else if (!roles.includes(user.role)) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    } else if (err || !user) {
      return next(apiError);
    }

    // auth passes
    // init user/session

    const { Session } = await model;
    // eslint-disable-next-line no-unused-vars
    const [session, _sessCreated] = await Session.findOrCreate({
      // @read if session exists
      where: { user_id: id },
      // @default write empty session
      defaults: { data: JSON.stringify({}) },
    });

    assign(req, { user, session });

    return next();
  };

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize =
  (roles = User.roles) =>
    (req, res, next) =>
      passport.authenticate(
        'jwt',
        { session: false },
        handleJWT(req, res, next, roles)
      )(req, res, next);
//
// exports.oAuth = (service) => passport.authenticate(service, { session: false });
