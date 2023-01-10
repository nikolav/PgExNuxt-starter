
const typeDefs = `#graphql

  type Message {
    id: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type GeoCoords {
    lat: Float!
    lng: Float!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: GeoCoords
  }

  type FakeUser {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address
  }

  type FakePost {
    id: ID!
    userId: Int!
    title: String!
    body: String!
  }

  type File {
    id: ID!
    fileID: String!
    user_id: String!
    title: String
    description: String
    filename: String!
    path: String!
    size: Int
    mimetype: String
    meta: String
    public: Boolean
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: ID!
    topicID: String!
    userId: String
    userName: String
    value: String!
    createdAt: String
    updatedAt: String
  }

  type Doc {
    id: ID!
    userId: String!
    data: String!
    docId: String
    createdAt: String
    updatedAt: String
  }

  input InputComment {
    topicID: String!
    value: String!
    userId: String
    userName: String
  }

  input InputDoc {
    jsonData: String!
    tag: String!
    id: ID
    docId: String
  }

  type Query {

    # etc.
    status: String!

    # messages
    messages: [Message]!
    message(id: ID!): Message

    # storage
    storageListFiles: [File]!

    # testing
    fakePosts: [FakePost!]!
    fakeUsers: [FakeUser!]!

    # likes
    likeCount(topicID: String!): Int!

    # comments
    listCommentsByTopic(topicID: String!): [Comment!]!

    # docs, collection
    listDocsByTopic(topicID: String!): [Doc!]!
    collectionGetDoc(docId: String!): Doc
  }

  type Mutation {

    # messages
    addMessage(content: String!): Message!
    removeMessage(id: ID!): Int!

    # storage
    storageRemoveFile(fileID: String!): String!

    # comments
    commentsAdd(comment: InputComment!): Comment!
    commentsRemove(id: ID!): Comment

    # docs, collection
    collectionPutDoc(d: InputDoc!): Doc!
    collectionRemoveDoc(id: ID!): Int!
  }
`;

module.exports = typeDefs;
