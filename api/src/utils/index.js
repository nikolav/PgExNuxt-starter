const assign = require('lodash/assign');
const clamp = require('lodash/clamp');
const identity = require('lodash/identity');
const map = require('lodash/map');
const range = require('lodash/range');

const dateSortedBy = require('./date-sorted-by');
const dateSortedDescBy = dateSortedBy;
const resolverMiddlewares = require('./resolver-middlewares');
const withMiddleware = resolverMiddlewares;

const False = () => false;
const True = () => true;
const Null = () => null;

module.exports = {
  assign,
  cached: require('./cached-redis'),
  clamp,
  dateSortedBy,
  dateSortedDescBy,
  False,
  groupByCount: require('./group-by-count'),
  gzip: require('./gzip'),
  hasOwn: require('./has-own'),
  identity,
  inlineTemplate: require('./inline-template'),
  map,
  Next: require('./next-middleware'),
  Null,
  pickValues: require('./pick-values'),
  range,
  resolverContext: require('./resolver-context'),
  resolverMiddlewares,
  setDownloadHeaders: require('./set-download-headers'),
  testId: require('./test-id'),
  True,
  validation: require('./run-validation'),
  withMiddleware,
};
