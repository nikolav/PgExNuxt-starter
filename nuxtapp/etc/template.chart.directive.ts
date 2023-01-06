import { Ref } from "vue";
import * as d3 from "d3";

import { IDataChartLine } from "@/types";
import { merge, map, maxOfValue, get } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-line";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartLine", {
    // chart steps:
    // @init
    //  1. fetch data, merge config
    //  2. calc. chart dimensions
    //  3. declare scales without domains
    //  4. add svg-canvas, graph, xAxis, yAxis
    // @data:updated
    //  5. set domains
    //  6. join data, draw shapes
    //      <selection>
    //       .data(<data$>, <key()>)
    //       .join(<enter()>, <update()>, <exit()>);
    //  7. draw axis

    // called when the bound element's parent component
    // and all its children are mounted.
    mounted: (el, binding) => {
      const data$: Ref<IDataChartLine[]> = get(binding, "value.data");
      const config: Partial<IConfig> = get(binding, "value.config");
      // merge config
      const {
        color,
        fill,
        height,
        key,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        strokeLinecap,
        strokeLinejoin,
        strokeOpacity,
        strokeWidth,
        value,
        width,
        xScale,
        yScale,
        yLabel,
        yLabelColor,
        yLabelOffsetX,
        yLabelOffsetY,
        _classCanvas,
        _classGraph,
        _classGuide,
        _classPath,
        _classXAxis,
        _classYAxis,
        _classYLabel,
        _curve,
        _guideHorizontalOpacity,
        _tickSizeOuter,
        _tickSpanHorizontal,
        _tickSpanVertical,
        _transitionDuration,
        _xAxisTextAnchor,
        _xAxisTextOpacity,
        _xAxisTextRotationDegrees,
        _xAxisTextFormat,
        _yAxisTextFormat,
      }: IConfig = merge({}, CONFIG, config);

      // @init

      // @data:updated
      watchEffect(() => {
        const data = data$.value || [];
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
