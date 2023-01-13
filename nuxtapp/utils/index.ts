import lodash from "lodash";

const {
  assign,
  clamp,
  each,
  filter,
  find,
  forOwn,
  get,
  identity,
  keys,
  map,
  maxBy,
  merge,
  minBy,
  omit,
  pick,
  random,
  range,
  reduce,
  set,
  transform,
} = lodash;

export {
  assign,
  clamp,
  each,
  filter,
  find,
  forOwn,
  get,
  identity,
  keys,
  map,
  maxBy,
  merge,
  minBy,
  omit,
  pick,
  random,
  range,
  reduce,
  set,
  transform,
};
export * from "./request-validation-schema-check";
export * from "./with-firestore-timestamps";

export { default as forEach } from "./for-each";
export { default as hasOwn } from "./has-own";
export { default as unpackBlob } from "./unpack-blob";
export { default as pickValues } from "./pick-values";
export { default as maxOfValue } from "./max-of-value";

export const False = () => false;
export const True = () => true;
export const withoutId = (node: any) => omit(Object(node), ["id"]);
