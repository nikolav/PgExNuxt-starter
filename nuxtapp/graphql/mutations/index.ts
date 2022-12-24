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
