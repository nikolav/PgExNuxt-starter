/* eslint-disable arrow-body-style */
const { expect } = require('chai');
const sinon = require('sinon');

const model = require('../../models/sequelize');

const sandbox = sinon.createSandbox();

(async () => {
  const { Main } = await model;
  //
  describe('@Sequelize --online', () => {
    afterEach(() => sandbox.restore());
    //
    it('test database online', async () => {
      const res = await Main.findOne({
        where: { name: 'test' },
        attributes: ['value'],
      });
      expect(res.value).to.be.equal('test');
    });
  });
})();
