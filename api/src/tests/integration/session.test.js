/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const axios = require('axios');
// const qs = require('qs');
const {
  // isArray,
  // find,
  isObjectLike,
} = require('lodash');

const app = require('../../index');
const User = require('../../models/user.model');
// const model = require('../../models/sequelize');

const sandbox = sinon.createSandbox();

(async () => {
  describe('@Session --online', () => {
    const user1 = {
      email: 'admin@nikolav.rs',
      password: '122333',
    };
    const user2 = {
      email: 'user@email.com',
      password: '122333',
    };

    // before(async () => {});
    // after(async () => {});
    let user1$;
    // eslint-disable-next-line no-unused-vars
    let user2$;
    beforeEach(async () => {
      // const { Role, RoleUser } = await model;
      let user_1 = await User.findOne({ email: user1.email });
      if (!user_1) user_1 = await User.create(user1);
      let user_2 = await User.findOne({ email: user2.email });
      if (!user_2) user_2 = await User.create(user2);
      user1$ = user_1;
      user2$ = user_2;
    });
    afterEach(() => sandbox.restore());

    it('allows authenticated user to read session', async () => {
      let AT;
      let ST;
      await request(app)
        .post('/v1/auth/login')
        .send(user1)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
          ST = body.token.sessionToken;
        });
      return request(app)
        .post(`/v1/session/${user1$._id.toString()}`)
        .set('Authorization', `Bearer ${AT}`)
        .send({ sessionToken: ST })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(isObjectLike(body)).to.be.true;
        });
    });
    it('allows authenticated user to write session', async () => {
      let AT;
      let ST;
      await request(app)
        .post('/v1/auth/login')
        .send(user1)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
          ST = body.token.sessionToken;
        });
      await request(app)
        .post(`/v1/session`)
        .set('Authorization', `Bearer ${AT}`)
        .send({
          sessionToken: ST,
          data: JSON.stringify({ test: 'session write test' }),
        })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.test).to.be.equal('session write test');
        });
      return request(app)
        .post(`/v1/session/${user1$._id.toString()}`)
        .set('Authorization', `Bearer ${AT}`)
        .send({ sessionToken: ST })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.test).to.be.equal('session write test');
        });
    });
    it('allows authenticated user to destroy session', async () => {
      let AT;
      let ST;
      await request(app)
        .post('/v1/auth/login')
        .send(user1)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
          ST = body.token.sessionToken;
        });
      return request(app)
        .delete(`/v1/session/${user1$._id.toString()}`)
        .set('Authorization', `Bearer ${AT}`)
        .send({ sessionToken: ST })
        .expect(httpStatus.OK)
        .then(({ body }) => {
          expect(body.rowsDeleted).to.be.equal(1);
        });
    });
    it("doesnt allow authenticated user to access other user's session", async () => {
      let AT;
      let ST;
      await request(app)
        .post('/v1/auth/login')
        .send(user2)
        .expect(httpStatus.OK)
        .then(({ body }) => {
          AT = body.token.accessToken;
          ST = body.token.sessionToken;
        });
      return (
        request(app)
          //  tries reading user1 session with user2 credentials
          .post(`/v1/session/${user1$._id.toString()}`)
          .set('Authorization', `Bearer ${AT}`)
          .send({ sessionToken: ST })
          .expect(httpStatus.FORBIDDEN)
      );
    });
  });
  //
})();
