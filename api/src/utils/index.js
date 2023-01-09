const assign = require('lodash/assign');
const clamp = require('lodash/clamp');
const each = require('lodash/each');
const get = require('lodash/get');
const identity = require('lodash/identity');
const map = require('lodash/map');
const omit = require('lodash/omit');
const pick = require('lodash/pick');
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
  each,
  False,
  get,
  groupByCount: require('./group-by-count'),
  gzip: require('./gzip'),
  hasOwn: require('./has-own'),
  identity,
  inlineTemplate: require('./inline-template'),
  map,
  Next: require('./next-middleware'),
  Null,
  omit,
  pick,
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
