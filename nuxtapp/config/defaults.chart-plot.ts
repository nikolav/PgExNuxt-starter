import { scaleLinear, scaleBand } from "d3";
import { IDataChartPlot } from "@/types";
import { identity } from "@/utils";

export interface IConfig {
  width: number;
  height: number;
  color: string;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  //
  key: (d: IDataChartPlot) => IDataChartPlot["key"];
  value: (d: IDataChartPlot) => IDataChartPlot["value"];
  format: <TData = any[], TResult = any[]>(data: TData) => TResult;
  xScale: typeof scaleBand;
  yScale: typeof scaleLinear;
  //
  _xAxisTextRotationDegrees: number;
  _xAxisTextOpacity: number;
  _xAxisAnchorText: string;
  _dotRadius: number;
  _tickSpanVertical: number;
  _tickSpanHorizontal: number;

  //
  _classCanvas: string;
  _classGraph: string;
  _classAxisX: string;
  _classAxisY: string;
  _classDots: string;
  _classGuide: string;
  _transitionDuration: number;
  _guideHorizontalOpacity: number;
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
  key: (d) => d.key,
  value: (d) => d.value,
  format: identity,
  xScale: scaleBand,
  yScale: scaleLinear,
  //
  _xAxisTextRotationDegrees: 0,
  _xAxisTextOpacity: 0.66,
  _xAxisAnchorText: "center",
  _dotRadius: 4,
  _tickSpanVertical: 92,
  _tickSpanHorizontal: 76,
  //
  _classCanvas: "chartPlot--canvas",
  _classGraph: "chartPlot--graph",
  _classAxisX: "chartPlot--xAxis",
  _classAxisY: "chartPlot--yAxis",
  _classDots: "chartPlot--dots",
  _classGuide: "chartPlot--guide",
  _transitionDuration: 1234,
  _guideHorizontalOpacity: 0.066,
};
