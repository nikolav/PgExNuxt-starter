export const QM__MESSAGES_POST = gql`
  mutation messagesPost($content: String!) {
    addMessage(content: $content) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;

export const QM__MESSAGES_DELETE = gql`
  mutation messagesDelete($id: ID!) {
    removeMessage(id: $id)
  }
`;

export const QM__STORAGE_REMOVE = gql`
  mutation removeFile($fileID: String!) {
    storageRemoveFile(fileID: $fileID)
  }
`;

// input InputComment {
//   topicID: String!
//   value: String!
//   userId: String
//   userName: String
// }
export const QM__COMMENTS_ADD = gql`
  mutation addComment($comment: InputComment!) {
    commentsAdd(comment: $comment) {
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

export const QM__COMMENTS_REMOVE = gql`
  mutation removeComment($id: ID!) {
    commentsRemove(id: $id) {
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
