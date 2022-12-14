const { expect } = require('chai');
const isEqual = require('lodash/isEqual');
const {
  groupByCount,
  hasOwn,
  testId,
  pickValues,
  inlineTemplate,
} = require('../../utils');

describe('unit-tests --functions', () => {
  // @@
  describe('@hasOwn(node, field);', () => {
    it('checks existance of objects own enumerable fields', () => {
      const node = { a: 1 };
      expect(hasOwn(node, 'a')).to.be.eq(true);
      expect(hasOwn(node, 'aa')).to.be.eq(false);
    });
    it('gives `false` for null or undefined values', () => {
      const node = null;
      let undefinded_;
      expect(hasOwn(node, 'a')).to.be.eq(false);
      expect(hasOwn(undefinded_, 'a')).to.be.eq(false);
    });
  });
  // @@
  describe('@groupByCount(collection);', () => {
    it('groups collection of primitives in gropus by count', () => {
      const collection = [1, 2, 2, 3, 3, 3, 'a', 'b', 'b'];
      const expected = { 1: 1, 2: 2, 3: 3, a: 1, b: 2 };
      const result = groupByCount(collection);
      expect(isEqual(result, expected)).to.be.eq(true);
    });
  });
  // @@
  describe('@testId();', () => {
    it('generates random strings for testing purpose', () => {
      const id1 = testId();
      const id2 = testId();
      expect(id1.length).to.be.gt(0);
      expect(id2.length).to.be.gt(0);
      expect(id1 !== id2).to.be.equal(true);
    });
  });
  // @@
  describe('@inlineTemplate({ template, locals });', () => {
    it('generates html document from handlebars template', async () => {
      const expected = `<p>test</p>`;
      const result = await inlineTemplate({
        template: '_test-for-render-template-function/index.html',
        locals: { test: 'test' },
      });
      //
      expect(result.trim()).to.eq(expected);
    });
  });
  // @@
  describe('@pickValues(node, ...fields);', () => {
    it('gets nested object values in a list', () => {
      const node = { a: { aa: 1 }, b: [1, 2], test: 'test' };
      const expected = ['test', 1, 2];
      const result = pickValues(node, 'test', 'a.aa', 'b[1]');
      expect(result).to.have.ordered.members(expected);
    });
  });
});
