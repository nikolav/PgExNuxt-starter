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
