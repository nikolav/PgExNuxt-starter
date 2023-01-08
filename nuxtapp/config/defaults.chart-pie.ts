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

  _legendLineHeight: number;
  _legendSymbolSize: number;
  _legendTextOffsetX: number;
  _legendTextOffsetY: number;
  _legendTextSize: number;
  _classLegendItem: string;
  _classLegendText: string;
}

export const CONFIG: IConfig = {
  width: 256,
  height: 256,
  colors: [...schemeCategory10],
  //
  padding: 12,
  innerRadiusPercent: 0.55,
  //
  key: (d) => d.key,
  value: (d) => d.value,
  format: identity,
  //
  _canvasOutline: false,
  _classCanvas: "chartPie--canvas",
  _classGraph: "chartPie--graph",
  _classPath: "chartPie--path",
  _padAngle: 0.02,
  _stroke: "#000000",
  _strokeLinejoin: "round",
  _strokeWidth: 1,
  _transitionDuration: 1234,
  // style legend
  legendWidth: 256,
  legendOffsetX: 22,
  legendOffsetY: 24,
  _legendLineHeight: 32,
  _legendSymbolSize: 10,
  _legendTextOffsetX: 24,
  _legendTextOffsetY: 6,
  _legendTextSize: 16,
  _classLegend: "chartPie--legend",
  _classLegendItem: "chartPie--legendItem",
  _classLegendText: "chartPie--legendText",
};
