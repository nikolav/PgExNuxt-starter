// #graphql pragma enable syntax color
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
    createdAt: String
    updatedAt: String
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
    
  }

  type Mutation {

    # messages
    addMessage(content: String!): Message!
    removeMessage(id: ID!): Int!

    # storage
    storageRemoveFile(fileID: String!): String!

  }
`;

module.exports = typeDefs;
