import { Ref } from "vue";
import * as d3 from "d3";

import { IDataChartPie } from "@/types";
import { merge, get } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-pie";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartPie", {
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
      const data$: Ref<IDataChartPie[]> = get(binding, "value.data");
      const config: Partial<IConfig> = get(binding, "value.config");
      // merge config
      const {
        width,
        height,
        colors,
        padding,
        innerRadius,
        legendWidth,
        key,
        value,
        format,
        _stroke,
        _strokeWidth,
        _transitionDiration,
      }: IConfig = merge({}, CONFIG, config);

      // @init

      // @data:updated
      watchEffect(() => {
        const data = format<
          IDataChartPie<string, number>[],
          IDataChartPie<string, number>[]
        >(data$.value || []);

        // [enter]
        // [update]
        // [exit]

        // axis
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
