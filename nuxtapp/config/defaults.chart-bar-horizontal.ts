import { IDataChartBarHorizontal } from "@/types";
import { identity } from "@/utils";

export interface IConfig {
  width: number;
  height: number;
  color: string;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;

  key: (d: IDataChartBarHorizontal) => IDataChartBarHorizontal["key"];
  value: (d: IDataChartBarHorizontal) => IDataChartBarHorizontal["value"];
  format: <TData = any[], TResult = IDataChartBarHorizontal[]>(
    data: TData
  ) => TResult;
  _classOutline: boolean;

  _tickSpanX: number;

  _paddingInner: number;
  _paddingOuter: number;

  _classCanvas: string;
  _classGraph: string;
  _classBars: string;
  _classXAxis: string;
  _classYAxis: string;

  _transitionDuration: number;
}

export const CONFIG: IConfig = {
  width: 550,
  height: 400,
  color: "currentcolor",
  paddingTop: 12,
  paddingRight: 12,
  paddingBottom: 36,
  paddingLeft: 36,

  _classOutline: false,

  key: (d: IDataChartBarHorizontal) => d.key,
  value: (d: IDataChartBarHorizontal) => d.value,
  format: identity,

  _tickSpanX: 82,

  _paddingInner: 0.02,
  _paddingOuter: 0,

  _classCanvas: "BarChartHorizontal--canvas",
  _classGraph: "BarChartHorizontal--graph",
  _classBars: "BarChartHorizontal--bars",
  _classXAxis: "BarChartHorizontal--xaxis",
  _classYAxis: "BarChartHorizontal--yaxis",

  _transitionDuration: 1234,
};
