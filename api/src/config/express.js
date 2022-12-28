const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const routes = require('../routes/v1');
const strategies = require('./passport');
const error = require('../middlewares/error');
const { logs, isProductionEnv, ACCESS_LOG } = require('./vars');
const accessLogs = require('./log-stream');
const corsConfig = require('./cors');

const app = express();

app.use(
  morgan(
    logs,
    isProductionEnv
      ? // log http @file
      accessLogs(ACCESS_LOG)
      : // log* stdout --one-line
      null
  )
);

// attach params to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip response
app.use(compress());

// polyfill HTTP verbs PUT, DELETE
app.use(methodOverride());

// set security headers
app.use(helmet());

// enable cors; allow app client
app.use(cors(corsConfig));

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
// setup login screen to get fb token
// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow
// passport.use('facebook', strategies.facebook);
// passport.use('google', strategies.google);

// mount* @/v1
app.use('/v1', routes);

// convert *error to APIError
app.use(error.converter);

// forward 404 to error handler
app.use(error.notFound);

// catch* error handler
// send stacktrace only during development
app.use(error.handler);

// use in tests, etc.
module.exports = app;
