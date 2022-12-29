import reduce from "lodash/reduce";
import get from "lodash/get";

const pickValues = <T = any>(src: T, ...fields: string[]) =>
  reduce(fields, pickBy_.bind(src)<T>, []);

export default pickValues;

//
function pickBy_<T = any>(this: T, accumulator: any[], valueField: string) {
  accumulator.push(get(this, valueField));
  return accumulator;
}
