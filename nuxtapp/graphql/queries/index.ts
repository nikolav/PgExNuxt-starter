export const Q__STATUS_CHECK = gql`
  query statusCheck {
    status
  }
`;

export const Q__MESSAGES_LIST = gql`
  query messagesList {
    messages {
      id
      content
      createdAt
      updatedAt
    }
  }
`;

export const Q__STORAGE_LIST = gql`
  query storageList {
    storageListFiles {
      id
      fileID
      user_id
      title
      description
      filename
      path
      size
      mimetype
      meta
      public
      createdAt
      updatedAt
    }
  }
`;

export const Q__LIKES_COUNT = gql`
  query likeCountByTopic($topicID: String!) {
    likeCount(topicID: $topicID)
  }
`;

export const Q__COMMENTS_LIST_BY_TOPIC = gql`
  query commentsByTopic($topicID: String!) {
    listCommentsByTopic(topicID: $topicID) {
      id
      topicID
      userId
      userName
      value
      createdAt
      updatedAt
    }
  }
`;
