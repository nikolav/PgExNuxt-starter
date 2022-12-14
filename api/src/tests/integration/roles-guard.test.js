/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
// const axios = require('axios');
// const qs = require('qs');
// const { isArray, find } = require('lodash');

const app = require('../../index');
const User = require('../../models/user.model');
const model = require('../../models/sequelize');

const sandbox = sinon.createSandbox();
(async () => {
  describe('@RoleAuthGuard --test', () => {
    const userHasAccessPolicy = {
      email: 'admin@nikolav.rs',
      password: '122333',
    };
    const userNoPolicy = {
      email: 'user@email.com',
      password: '122333',
    };

    // before(async () => {});
    // after(async () => {});
    beforeEach(async () => {
      const { Role, RoleUser } = await model;
      let user = await User.findOne({
        email: userHasAccessPolicy.email,
      });
      if (!user) user = await User.create(userHasAccessPolicy);
      let user2 = await User.findOne({ email: userNoPolicy.email });
      if (!user2) user2 = await User.create(userNoPolicy);
      const userId = user._id.toString();
      const [role1] = await Role.findOrCreate({
        where: { name: 'role-test' },
      });
      await Role.findOrCreate({ where: { name: 'role2 test' } });

      // 'role-test' @ 'admin@nikolav.rs'
      await RoleUser.findOrCreate({
        where: { userId, roleId: role1.id },
      });
    });
    afterEach(() => sandbox.restore());

    it('allows authenticated user with enough required policies to access guarded route', async () => {
      let token;
      await request(app)
        .post('/v1/auth/login')
        .send(userHasAccessPolicy)
        .then(({ body }) => {
          token = body.token.accessToken;
        });
      return request(app)
        .get('/v1/testing/test')
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.status).to.be.equal('test ok');
        });
    });

    it('doesnt allow authenticated user without required policy to access guarded route', async () => {
      let token;
      await request(app)
        .post('/v1/auth/login')
        .send(userNoPolicy)
        .then(({ body }) => {
          token = body.token.accessToken;
        });
      return request(app)
        .get('/v1/testing/test')
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.FORBIDDEN);
    });
  });
  //
})();
