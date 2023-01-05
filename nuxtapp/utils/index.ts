import lodash from "lodash";

const {
  assign,
  clamp,
  each,
  filter,
  find,
  forOwn,
  get,
  map,
  maxBy,
  merge,
  omit,
  pick,
  range,
  reduce,
  set,
} = lodash;

export {
  assign,
  clamp,
  each,
  filter,
  find,
  forOwn,
  get,
  map,
  maxBy,
  merge,
  omit,
  pick,
  range,
  reduce,
  set,
};
export * from "./request-validation-schema-check";
export { default as forEach } from "./for-each";
export { default as hasOwn } from "./has-own";
export { default as unpackBlob } from "./unpack-blob";
export { default as pickValues } from "./pick-values";
export { default as maxOfValue } from "./max-of-value";

export const False = () => false;
export const True = () => true;
