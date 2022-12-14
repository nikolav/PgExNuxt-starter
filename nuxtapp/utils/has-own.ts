const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
export default (node: any, key: any) => has_(Object(node), key);
