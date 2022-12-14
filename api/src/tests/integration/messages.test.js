/* eslint-disable arrow-body-style */
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const httpStatus = require('http-status');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { isArray } = require('lodash');
const { testId } = require('../../utils');

const app = require('../../index');
const User = require('../../models/user.model');
// const model = require('../../models/sequelize');

const sandbox = sinon.createSandbox();

(async () => {
  describe('@Messages --online', () => {
    const user1Creds = {
      email: 'admin@nikolav.rs',
      password: '122333',
    };
    const newMessage = {
      id: null,
      content: `m --${testId()}`,
    };
    // before(async () => {});
    // after(async () => {});
    beforeEach(async () => {
      let user_1 = await User.findOne({ email: user1Creds.email });
      if (!user_1) user_1 = await User.create(user1Creds);
    });
    afterEach(() => sandbox.restore());

    it('allows authenticated user to read messages', async () => {
      let AT;
      await request(app)
        .post('/v1/auth/login')
        .send(user1Creds)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
        });
      return request(app)
        .post(`/v1/graphql`)
        .set('Authorization', `Bearer ${AT}`)
        .send({ query: `query { messages { id } }` })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.data).to.have.property('messages');
          expect(isArray(body.data.messages)).to.be.true;
        });
    });
    it('allows authenticated user to write to messages', async () => {
      let AT;
      await request(app)
        .post('/v1/auth/login')
        .send(user1Creds)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
        });
      return request(app)
        .post(`/v1/graphql`)
        .set('Authorization', `Bearer ${AT}`)
        .send({
          query: `mutation { addMessage(content: \"${newMessage.content}\") { id, content } }`,
        })
        .expect(httpStatus.CREATED)
        .then(({ body }) => {
          expect(body.data.addMessage.content).to.be.equal(
            newMessage.content
          );
          newMessage.id = body.data.addMessage.id;
        });
    });
    it('addMessage fails if provided empty @content', async () => {
      let AT;
      await request(app)
        .post('/v1/auth/login')
        .send(user1Creds)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
        });
      return (
        request(app)
          .post(`/v1/graphql`)
          .set('Authorization', `Bearer ${AT}`)
          .send({
            query: `mutation { addMessage(content: "") { id } }`,
          })
          // check customizes apollo 400
          // https://www.apollographql.com/docs/apollo-server/data/errors/#setting-http-status-code-and-headers
          .expect(httpStatus.BAD_REQUEST)
          .then(({ body }) => {
            expect(body.errors[0].extensions.code).to.eq(
              ApolloServerErrorCode.BAD_REQUEST
            );
          })
      );
    });
    it('allows authenticated user to read one message by id', async () => {
      let AT;
      await request(app)
        .post('/v1/auth/login')
        .send(user1Creds)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
        });
      return request(app)
        .post(`/v1/graphql`)
        .set('Authorization', `Bearer ${AT}`)
        .send({
          query: `query { message(id: \"${newMessage.id}\") { content } }`,
        })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.data.message.content).to.be.equal(
            newMessage.content
          );
        });
    });
    it('allows authenticated user to delete from messages', async () => {
      let AT;
      await request(app)
        .post('/v1/auth/login')
        .send(user1Creds)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
        });
      return request(app)
        .post(`/v1/graphql`)
        .set('Authorization', `Bearer ${AT}`)
        .send({
          query: `mutation { removeMessage(id: \"${newMessage.id}\") }`,
        })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.data.removeMessage).to.be.equal(1);
        });
    });
    it('doesnt allow unauthenticated request to messages resource', async () =>
      request(app)
        .post(`/v1/graphql`)
        .set('Authorization', '')
        .send({ query: `query { messages { id } }` })
        .expect(httpStatus.UNAUTHORIZED));
  });
  //
})();
