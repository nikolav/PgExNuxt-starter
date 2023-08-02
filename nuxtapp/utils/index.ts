import * as lodash from "lodash";

const {
  assign,
  clamp,
  each,
  filter,
  find,
  findIndex,
  forOwn,
  get,
  identity,
  keys,
  map,
  maxBy,
  merge,
  minBy,
  noop,
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
  findIndex,
  forOwn,
  get,
  identity,
  keys,
  map,
  maxBy,
  merge,
  minBy,
  noop,
  omit,
  pick,
  random,
  range,
  reduce,
  set,
  transform,
};

export { isNumeric, forEach, has as hasOwn } from "nikolav-utils";

export * from "./request-validation-schema-check";
export * from "./with-firestore-timestamps";

export { default as unpackBlob } from "./unpack-blob";
export { default as pickValues } from "./pick-values";
export { default as maxOfValue } from "./max-of-value";
export { default as stripEndSlashes } from "./strip-end-slashes";

export const False = () => false;
export const True = () => true;
export const withoutId = (node: any) => omit(Object(node), ["id"]);
