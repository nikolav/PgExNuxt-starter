
export const Q__STATUS_CHECK = gql`
  query statusCheck { status }
`;

export const Q__MESSAGES_LIST = gql`
  query messagesList { messages { id, content, createdAt, updatedAt } }
`;
