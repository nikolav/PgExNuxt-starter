/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const { isArray, find } = require('lodash');

const app = require('../../index');
const User = require('../../models/user.model');
const model = require('../../models/sequelize');

let AT;

const sandbox = sinon.createSandbox();
(async () => {
  describe('@Variables --online', () => {
    const dbUser = {
      email: 'branstark@gmail.com',
      password: 'mypassword',
      name: 'Bran Stark',
      role: 'admin',
    };

    before(async () => {
      const { Main } = await model;
      await Main.findOrCreate({
        where: { name: 'test' },
        defaults: { value: 'test' },
      });
      await Main.destroy({ where: { name: 'test--destroyed' } });
    });
    beforeEach(async () => {
      await User.deleteMany({});
      await User.create(dbUser);
      AT = (await User.findAndGenerateToken(dbUser)).accessToken;
    });
    afterEach(() => sandbox.restore());
    // after(async () => {});

    describe('@@ variables', () => {
      // @@
      it('lists all variables for authenticated request', () =>
        request(app)
          .get('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(isArray(res.body)).to.equal(true);
            expect(find(res.body, { name: 'test' }).value).to.equal(
              'test'
            );
          }));
      // @@
      it('sends 401 for unauthorized request', () =>
        request(app)
          .get('/v1/variables')
          .expect(httpStatus.UNAUTHORIZED));
    });

    describe('@@ variables/<name>', () => {
      // @@
      it('fetches single variable for authenticated request', () =>
        request(app)
          .get('/v1/variables/test')
          .set('Authorization', `Bearer ${AT}`)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.value).to.equal('test');
          }));
      // @@
      it('sets variable name/value pair', () =>
        request(app)
          .post('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .send({ name: 'test-2', value: 'test-2' })
          .expect(httpStatus.CREATED)
          .then((res) => {
            expect(res.body.value).to.equal('test-2');
          }));
      // @@
      it('returns NULL for undefined variable name', () =>
        request(app)
          .get('/v1/variables/test--destroyed')
          .set('Authorization', `Bearer ${AT}`)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.equal(null);
          }));
      // @@
      it('deletes variable by pk/id', async () => {
        const { Main } = await model;
        const { id } = await Main.create({
          name: `test-to-destroy--${Date.now()}`,
          value: 'test-to-destroy',
        });
        return request(app)
          .delete('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .send({ id })
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.have.property('rowsDeleted');
          });
      });
      // @@
      it('sends 401 for unauthorized set variable request', () =>
        request(app)
          .post('/v1/variables')
          .send({ name: 'test-3', value: 'test-3' })
          .expect(httpStatus.UNAUTHORIZED));
      // @@
      it('sends 401 for unauthorized delete variable request', () =>
        request(app)
          .delete('/v1/variables')
          .send({ id: 0 })
          .expect(httpStatus.UNAUTHORIZED));
      // @@
      it('sends 400 for missing variable .name', () =>
        request(app)
          .post('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .send({ value: 'test-2' })
          .expect(httpStatus.BAD_REQUEST));
      // @@
      it('sends 400 for missing variable .value', () =>
        request(app)
          .post('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .send({ name: 'test-2' })
          .expect(httpStatus.BAD_REQUEST));
      // @@
      it('sends 400 for missing input', () =>
        request(app)
          .post('/v1/variables')
          .set('Authorization', `Bearer ${AT}`)
          .send({})
          .expect(httpStatus.BAD_REQUEST));

      ////
    });

    // @todo
    //   passes isolated  --$ yarn run test:only:variables
    //   fails in batch   --$ yarn test
    // describe('@@ unauthorized request for single variable', () => {
    //   // @@
    //   it('fails on unauthentcated request when reading variable by name', () =>
    //     request(app)
    //       .get('/v1/variables/test')
    //       .expect(httpStatus.UNAUTHORIZED));
    // });
  });
  //
})();
