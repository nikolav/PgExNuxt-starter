import { IHasValueNumber } from "@/types";

const maxOfValue = (ls: IHasValueNumber[]) =>
  Math.max(...ls.map(({ value }) => value));

export default maxOfValue;
