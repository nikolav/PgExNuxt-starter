import { IDataChartBarVertical } from "@/types";

export interface IConfig {
  width: number;
  height: number;
  color: string;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  //
  // accesors
  // export type ValueFn<T extends BaseType, Datum, Result> = (this: T, datum: Datum, index: number, groups: T[] | ArrayLike<T>) => Result;
  key: (d: IDataChartBarVertical) => string;
  value: (d: IDataChartBarVertical) => number;
  //
  // minor tweeks
  // _xAxisTextRotationDegrees: -24,
  // _xAxisTextOpacity: 0.85,
  _ticksX: number;
  _ticksY: number;
  // _tickSize,
  // _tickSizeInner,
  // _tickSizeOuter,
  // _tickFormat,
  // _tickValues,
  _paddingInner: number;
  _paddingOuter: number;
  //
  _classCanvas: string;
  _classGraph: string;
  _classBars: string;
  _classXAxis: string;
  _classYAxis: string;
  //
  // [ms]
  _transitionDuration: number;
}

export const CONFIG: IConfig = {
  width: 550,
  height: 400,
  color: "currentcolor",
  paddingTop: 48,
  paddingRight: 32,
  paddingBottom: 48,
  paddingLeft: 32,
  //
  // accesors
  // export type ValueFn<T extends BaseType, Datum, Result> = (this: T, datum: Datum, index: number, groups: T[] | ArrayLike<T>) => Result;
  key: (d: IDataChartBarVertical) => d.key,
  value: (d: IDataChartBarVertical) => d.value,
  //
  // minor tweeks
  // _xAxisTextRotationDegrees: -24,
  // _xAxisTextOpacity: 0.85,
  _ticksX: 5,
  _ticksY: 4,
  // _tickSize,
  // _tickSizeInner,
  // _tickSizeOuter,
  // _tickFormat,
  // _tickValues,
  _paddingInner: 0.01,
  _paddingOuter: 0.01,
  //
  _classCanvas: "BarChart--canvas",
  _classGraph: "BarChart--graph",
  _classBars: "BarChart--bars",
  _classXAxis: "BarChart--xaxis",
  _classYAxis: "BarChart--yaxis",
  //
  // [ms]
  _transitionDuration: 345,
};
