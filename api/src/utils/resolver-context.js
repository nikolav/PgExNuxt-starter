const axios = require('axios');
const httpStatus = require('http-status');

const model = require('../models/sequelize');
const dateSortedBy = require('./date-sorted-by');
const User = require('../models/user.model');
const config = require('../config/vars');
const logger = require('../config/logger');

const dateSortedDescBy = dateSortedBy;

// https://www.apollographql.com/docs/apollo-server/data/context#the-context-function
// export services object to share in all graphql resolvers
// eslint-disable-next-line no-unused-vars
module.exports = async ({ req, res }) => {

  // await apis to resolve, then pass to context
  const [db] = await Promise.all([
    model,
  ]);

  return {
    axios,
    config,
    dateSortedBy,
    dateSortedDescBy,
    db,
    httpStatus,
    logger,
    req,
    res,
    token: '8szBeTYO9XD',
    User,
    user: req.user,
  }
};
