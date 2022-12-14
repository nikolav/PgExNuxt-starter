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

  type Query {
    status: String!
    messages: [Message]!
    message(id: ID!): Message

    # testing
    fakePosts: [FakePost!]!
    fakeUsers: [FakeUser!]!
  }

  type Mutation {
    addMessage(content: String!): Message!
    removeMessage(id: ID!): Int!
  }
`;

module.exports = typeDefs;
