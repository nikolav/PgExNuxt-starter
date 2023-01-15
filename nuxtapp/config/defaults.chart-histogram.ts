import { identity } from "@/utils";
import { OrNull } from "@/types";

export interface IConfig {
  width: number;
  height: number;
  thresholds: number;
  color: string;
  pad: number;
  yLabel: string;
  yLabelOffsetX: number;
  yLabelOffsetY: number;
  yLabelColor: string;
  yLabelOpacity: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  format: <TData = any, TResult = number>(data: TData[]) => TResult[];
  _canvasOutline: boolean;
  _classCanvas: string;
  _classGraph: string;
  _classBins: string;
  _classAxisX: string;
  _classAxisY: string;
  _classYLabel: string;
  _tickSpanHorizontal: number;
  _tickSpanVertical: number;
  _transitionDuration: number;
  _xAxisTextRotationDegrees: number;
  _xAxisAnchorText: string;
  _xAxisTextOpacity: number;
  _xDomain: OrNull<[number, number]>;
}

export const CONFIG: IConfig = {
  width: 550,
  height: 400,
  thresholds: 40,
  color: "currentcolor",
  pad: 0.2,

  yLabel: "f",
  yLabelColor: "currentcolor",
  yLabelOpacity: .55,
  yLabelOffsetX: 0,
  yLabelOffsetY: 0,

  paddingTop: 42,
  paddingRight: 16,
  paddingBottom: 32,
  paddingLeft: 32,

  format: identity,

  _canvasOutline: false,
  _classCanvas: "chartHistogram--canvas",
  _classGraph: "chartHistogram--graph",
  _classBins: "chartHistogram--bins",
  _classAxisX: "chartHistogram--xAxis",
  _classAxisY: "chartHistogram--yAxis",
  _classYLabel: "chartHistogram--yLabel",

  _tickSpanVertical: 92,
  _tickSpanHorizontal: 52,

  _xAxisTextRotationDegrees: 0,
  _xAxisTextOpacity: 0.66,
  _xAxisAnchorText: "center",

  _transitionDuration: 1234,

  _xDomain: null,
};
