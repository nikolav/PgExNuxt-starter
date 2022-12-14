/* eslint-disable arrow-body-style */
const request = require('supertest');
const { expect } = require('chai');
const httpStatus = require('http-status');
const app = require('../../index');
const User = require('../../models/user.model');

let AT;

describe('@ApolloGraphql --inits', () => {
  const dbUser = {
    email: 'branstark@gmail.com',
    password: '122333',
    name: 'Bran Stark',
    role: 'admin',
  };

  beforeEach(async () => {
    await User.deleteMany({});
    await User.create(dbUser);
    AT = (await User.findAndGenerateToken(dbUser)).accessToken;
  });

  //
  it('apollo online', () =>
    request(app)
      .post('/v1/graphql')
      .set('Authorization', `Bearer ${AT}`)
      .send({ query: 'query { status }' })
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.data.status).to.be.equal('graphql');
      }));
  it('unauthorized request to graphql data fails', () =>
    request(app)
      .post('/v1/graphql')
      .set('Authorization', 'Bearer lorem')
      .send({ query: 'query { status }' })
      .expect(httpStatus.UNAUTHORIZED));
});
