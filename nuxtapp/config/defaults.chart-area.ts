import * as d3 from "d3";

import { IDataChartArea } from "@/types";
import { identity } from "@/utils";

export const CONFIG = {
  width: 550,
  height: 400,
  paddingTop: 32,
  paddingRight: 16,
  paddingBottom: 32,
  paddingLeft: 32,
  fill: "currentColor",
  //
  key: (d: IDataChartArea) => d.key,
  value: (d: IDataChartArea) => d.value,
  //
  curve: d3.curveCardinal,
  //
  format: <TChartAreaInputData = any>(
    data: TChartAreaInputData
  ): IDataChartArea[] => <IDataChartArea[]>data,
  //
  _classCanvas: "chartArea--canvas",
  _classGraph: "chartArea--graph",
  _classXAxis: "chartArea--xAxis",
  _classYAxis: "chartArea--yAxis",
  _classPath: "chartArea--path",
  //
  _transitionDuration: 678,
  //
  _tickSizeOuter: 0,
  _tickSpanHorizontal: 76,
  _tickSpanVertical: 92,
  //
  _xAxisTextFormat: identity,
  _xAxisTextAnchor: "center",
  _xAxisTextOpacity: 1,
  _xAxisTextRotationDegrees: 0,
  _yAxisTextFormat: identity,
};

export type TConfig = typeof CONFIG;
