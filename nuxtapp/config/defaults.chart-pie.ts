import { schemeCategory10 } from "d3";
import { IDataChartPie } from "@/types";
import { identity } from "@/utils";

export interface IConfig {
  width: number;
  height: number;
  colors: string[];
  padding: number;
  innerRadiusPercent: number;
  legendWidth: number;
  legendOffsetX: number;
  legendOffsetY: number;
  key: (d: IDataChartPie) => IDataChartPie["key"];
  value: (d: IDataChartPie) => IDataChartPie["value"];
  format: <TData = any[], TResult = any[]>(data: TData) => TResult;
  _canvasOutline: boolean;
  _classCanvas: string;
  _classGraph: string;
  _classLegend: string;
  _classPath: string;
  _padAngle: number;
  _stroke: string;
  _strokeLinejoin: string;
  _strokeWidth: number;
  _transitionDuration: number;
}

export const CONFIG: IConfig = {
  width: 256,
  height: 256,
  colors: [...schemeCategory10],
  //
  padding: 2,
  innerRadiusPercent: 0.55,
  legendWidth: 256,
  legendOffsetX: 32,
  legendOffsetY: 48,
  //
  key: (d) => d.key,
  value: (d) => d.value,
  format: identity,
  //
  _canvasOutline: false,
  _classCanvas: "chartPie--canvas",
  _classGraph: "chartPie--graph",
  _classLegend: "chartPie--legend",
  _classPath: "chartPie--path",
  _padAngle: 0.02,
  _stroke: "#000000",
  _strokeLinejoin: "round",
  _strokeWidth: 1,
  _transitionDuration: 1234,
};
