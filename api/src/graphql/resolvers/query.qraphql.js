const Query = {
  status: require('./queries/status.graphql'),

  // @@messsages
  messages: require('./queries/messages/list'),
  message: require('./queries/messages/find-one-by-id'),

  // @@storage
  storageListFiles: require('./queries/storage/list'),

  // @@testing
  fakePosts: require('./queries/testing/fake-posts'),
  fakeUsers: require('./queries/testing/fake-users'),
};

module.exports = Query;
