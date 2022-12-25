const axios = require('axios');
const httpStatus = require('http-status');

const model = require('../models/sequelize');
const User = require('../models/user.model');
const config = require('../config/vars');
const logger = require('../config/logger');
const dateSortedBy = require('./date-sorted-by');

// export services object to share in all graphql resolvers
// eslint-disable-next-line no-unused-vars
module.exports = ({ req, res }) => ({
  axios,
  config,
  dateSortedBy,
  httpStatus,
  logger,
  model,
  req,
  res,
  token: 'jzxxdebbksn',
  User,
  user: req.user,
});
