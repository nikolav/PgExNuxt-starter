const hasOwn_ = Function.prototype.call.bind(
  Object.prototype.hasOwnProperty
);
module.exports = (node, field) => hasOwn_(Object(node), field);
