
export const Q__STATUS_CHECK = gql`
  query statusCheck { status }
`;

export const Q__MESSAGES_LIST = gql`
  query messagesList { messages { id, content, createdAt, updatedAt } }
`;

export const Q__STORAGE_LIST = gql`
  query storageList { storageListFiles { id, fileID, user_id, title, description, filename, path, size, mimetype, meta, public, createdAt, updatedAt } }
`;
