import { scaleLinear, curveBasis } from "d3";

import { identity } from "@/utils";
import { IDataChartLine } from "@/types";

export interface IConfig {
  width: number;
  height: number;
  //
  color: string;
  fill: string;
  strokeWidth: number;
  strokeLinecap: string;
  strokeLinejoin: string;
  strokeOpacity: number;
  //
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  //
  yLabel: string;
  yLabelColor: string;
  yLabelOffsetX: number;
  yLabelOffsetY: number;
  //
  // xScale: scaleUtc,
  xScale: any;
  yScale: any;
  //
  // accesors
  // gets x-axis value
  key: (d: IDataChartLine) => number;
  // gets y-axis value
  value: (d: IDataChartLine) => number;
  // format data, f<d>
  format: <TData = any[], TResult = any[]>(data: TData) => TResult;
  //
  _xAxisTextRotationDegrees: number;
  _xAxisTextOpacity: number;
  _xAxisTextAnchor: string;
  _xAxisTextFormat: any;
  _yAxisTextFormat: any;
  //
  _classCanvas: string;
  _classGraph: string;
  _classPath: string;
  _classXAxis: string;
  _classYAxis: string;
  _classGuide: string;
  _classYLabel: string;
  //
  // _curve: curveLinear,
  _curve: any;
  _guideHorizontalOpacity: number;
  //
  _tickSizeOuter: number;
  _tickSpanVertical: number;
  _tickSpanHorizontal: number;
  //
  _transitionDuration: number;
}

export const CONFIG: IConfig = {
  width: 576,
  height: 456,
  //
  color: "currentColor",
  fill: "none",
  strokeWidth: 2.34,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeOpacity: 1,
  //
  paddingTop: 48,
  paddingRight: 32,
  paddingBottom: 48,
  paddingLeft: 48,
  //
  yLabel: "[Y]",
  yLabelColor: "currentColor",
  yLabelOffsetX: -34,
  yLabelOffsetY: -28,
  // xScale: scaleUtc,
  xScale: scaleLinear,
  yScale: scaleLinear,
  // accesors
  key: (d) => d.key,
  value: (d) => d.value,
  // format data, f(d)
  format: identity,
  //
  _xAxisTextRotationDegrees: 0,
  _xAxisTextOpacity: 1,
  _xAxisTextAnchor: "center",
  _xAxisTextFormat: identity,
  _yAxisTextFormat: identity,
  //
  _classCanvas: "ChartLine--canvas",
  _classGraph: "ChartLine--graph",
  _classPath: "ChartLine--path",
  _classXAxis: "ChartLine--xaxis",
  _classYAxis: "ChartLine--yaxis",
  _classGuide: "ChartLine--guide",
  _classYLabel: "ChartLine--yLabel",
  // _curve: curveLinear,
  _curve: curveBasis,
  _guideHorizontalOpacity: 0.056,
  //
  _tickSizeOuter: 0,
  _tickSpanVertical: 92,
  _tickSpanHorizontal: 76,
  //
  _transitionDuration: 1234,
};
