const axios = require('axios');
const httpStatus = require('http-status');

const { dateSortedBy, dateSortedDescBy } = require('./index');
const User = require('../models/user.model');
const config = require('../config/vars');
const logger = require('../config/logger');

// export services object to share in all graphql resolvers
// eslint-disable-next-line no-unused-vars
module.exports = ({ req, res }) => ({
  axios,
  config,
  dateSortedBy,
  dateSortedDescBy,
  httpStatus,
  logger,
  req,
  res,
  token: 'jzxxdebbksn',
  User,
  user: req.user,
});
