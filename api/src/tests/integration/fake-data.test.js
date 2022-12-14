/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const { isArray } = require('lodash');

const app = require('../../index');
const User = require('../../models/user.model');
// const model = require('../../models/sequelize');

const sandbox = sinon.createSandbox();

(async () => {
  describe('@FakePosts --online', () => {
    // eslint-disable-next-line no-unused-vars
    let user1$;
    const user1Creds = {
      email: 'admin@nikolav.rs',
      password: '122333',
    };
    // before(async () => {});
    // after(async () => {});
    beforeEach(async () => {
      let user_1 = await User.findOne({ email: user1Creds.email });
      if (!user_1) user_1 = await User.create(user1Creds);
      user1$ = user_1;
    });
    afterEach(() => sandbox.restore());

    it('allows authenticated user to access fake posts testing data', async () => {
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
        .send({ query: `query { fakePosts { id } }` })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(isArray(body.data.fakePosts)).to.be.true;
        });
    });
    it('allows authenticated user to access fake user accounts testing data', async () => {
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
        .send({ query: `query { fakeUsers { id } }` })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(isArray(body.data.fakeUsers)).to.be.true;
        });
    });
    it('doesnt allow unauthenticated request to testing data', async () =>
      request(app)
        .post(`/v1/graphql`)
        .set('Authorization', '')
        .send({ query: `query { fakeUsers { id } }` })
        .expect(httpStatus.UNAUTHORIZED));
  });
  //
})();
