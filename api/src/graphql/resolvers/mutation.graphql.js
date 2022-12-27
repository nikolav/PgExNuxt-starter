const Mutation = {
  // @messsages
  addMessage: require('./mutations/messages/add-message'),
  removeMessage: require('./mutations/messages/remove-message'),
  // @storage
  storageRemoveFile: require('./mutations/storage/remove-file'),
  // @comments
  commentsAdd: require('./mutations/comments/add'),
  commentsRemove: require('./mutations/comments/rm'),
};

module.exports = Mutation;
