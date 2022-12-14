/* eslint-disable arrow-body-style */
const { expect } = require('chai');
const model = require('../../models/sequelize');
const { testId } = require('../../utils');

(() => {
  //
  describe('@Tokens --model', () => {
    const tok = testId();
    let Tokens;
    before(async () => {
      const m$ = await model;
      Tokens = m$.Tokens;

      await Tokens.expireAll();
      await Tokens.valid(tok);
    });
    // beforeEach(async () => {});
    // afterEach(() => sandbox.restore());
    // after(() => {});

    it('stores valid tokens', async () => {
      expect(await Tokens.isValid(tok)).to.be.true;
    });
    it('validates tokens; @isValid(token);', async () => {
      expect(await Tokens.isValid(testId())).to.be.false;
    });
    it('calculates token age, return UNDEF for invalid', async () => {
      expect(await Tokens.age(tok)).to.be.gt(0);
      expect(await Tokens.age(testId())).to.be.undefined;
    });
    it('expires token', async () => {
      const tokTemp = testId();

      await Tokens.valid(tokTemp);
      expect(await Tokens.isValid(tokTemp)).to.be.true;

      await Tokens.expire(tokTemp);
      expect(await Tokens.isValid(tokTemp)).to.be.false;
    });
    it('expires all tokens', async () => {
      const count1 = await Tokens.count();
      expect(count1).to.be.gt(0);
      expect(await Tokens.isValid(tok)).to.be.true;

      await Tokens.expireAll();
      const count2 = await Tokens.count();
      expect(await Tokens.isValid(tok)).to.be.false;
      expect(count2).to.eq(0);
    });
  });
  //
})();
