const axios = require('axios');
const model = require('../models/sequelize');
const User = require('../models/user.model');
const config = require('../config/vars');
const logger = require('../config/logger');
const httpStatus = require('http-status');

// export services object to share in all graphql resolvers
// eslint-disable-next-line no-unused-vars
module.exports = ({ req, res }) => ({
  axios,
  config,
  httpStatus,
  logger,
  model,
  req,
  res,
  token: 'jzxxdebbksn',
  User,
  user: req.user,
});
