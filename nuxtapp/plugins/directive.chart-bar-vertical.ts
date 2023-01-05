import { Ref } from "vue";
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select,
  transition,
} from "d3";

import { IDataChartBarVertical } from "@/types";
import { merge, map, maxOfValue, get } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-bar-vertical";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartBarVertical", {
    // chart steps:
    // @init
    //  1. fetch data, merge config
    //  2. calc. chart dimensions
    //  3. declare scales without domains
    //  4. add svg-canvas, graph, xAxis, yAxis, default transition
    // @data:updated
    //  5. set domains
    //  6. join data, draw shapes
    //      <selection>
    //       .data(<data$>, <key()>)
    //       .join(<enter()>, <update()>, <exit()>);
    //  7. draw axis

    // called when the bound element's parent component
    // and all its children are mounted.
    mounted: (el, binding, _vnode, _prevVnode) => {
      const data$: Ref<IDataChartBarVertical[]> = get(binding, "value.data");
      const config: Partial<IConfig> = get(binding, "value.config");

      const {
        width,
        height,
        color,
        //
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        //
        key,
        value,
        //
        _classCanvas,
        _classGraph,
        _classBars,
        _classXAxis,
        _classYAxis,
        //
        _paddingInner,
        _paddingOuter,
        //
        _ticksX,
        _ticksY,
        // _tickSize,
        // _tickSizeInner,
        // _tickSizeOuter,
        // _tickFormat,
        // _tickValues,

        //
        // _xAxisTextOpacity,
        // _xAxisTextRotationDegrees,

        //
        _transitionDuration,
      }: IConfig = merge({}, CONFIG, config);

      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      const x = scaleBand()
        .range([0, innerWidth])
        .paddingInner(_paddingInner)
        .paddingOuter(_paddingOuter);
      const y = scaleLinear().range([innerHeight, 0]);

      const svg = select(el)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        //   .style("border", "1px dotted grey")
        .classed(_classCanvas, true);

      const graph = svg
        .append("g")
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
        .classed(_classGraph, true);

      const xAxis = svg
        .append("g")
        .attr(
          "transform",
          `translate(${paddingLeft}, ${height - paddingBottom})`
        )
        .classed(_classXAxis, true);

      const yAxis = svg
        .append("g")
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
        .classed(_classYAxis, true);

      const t = transition("@transition.ChartBarVertical").duration(
        _transitionDuration
      );

      watchEffect(() => {
        // @data:updated
        const data_ = data$.value || [];

        // update scale domains
        x.domain(map(data_, key));
        y.domain([0, maxOfValue(data_)]);

        // draw shapes
        graph
          .selectAll("rect")
          // .data(data_, key)
          .data(data_)
          .join(
            (enter) =>
              enter
                .append("rect")
                .attr("x", (d) => x(d.key) as number)
                .attr("width", x.bandwidth())
                .attr("fill", color)
                .classed(_classBars, true)
                // transition.from
                .attr("y", y(0))
                .attr("height", 0)
                .attr("fill-opacity", 0)
                .call((enter) =>
                  enter
                    .transition(t)
                    // transition.to
                    .attr("y", (d) => y(d.value))
                    .attr("height", (d) => innerHeight - y(d.value))
                    .attr("fill-opacity", 1)
                ),
            (update) =>
              update.call((update) =>
                update
                  .transition(t)
                  // transition.to from current
                  .attr("x", (d) => x(d.key) as number)
                  .attr("y", (d) => y(d.value))
                  .attr("width", x.bandwidth())
                  .attr("height", (d) => innerHeight - y(d.value))
              ),
            (exit) =>
              exit
                // transition.from
                .attr("fill", "#ff0000")
                .call((exit) =>
                  exit
                    .transition(t)
                    // transition.to
                    .attr("fill-opacity", 0)
                    .attr("y", y(0))
                    .attr("height", 0)
                )
                .remove()
          );

        // draw axis
        xAxis.transition(t).call(axisBottom(x).ticks(_ticksX));
        yAxis.transition(t).call(axisLeft(y).ticks(_ticksY));
      });
    },

    // called when the parent component is unmounted
    unmounted(el, binding, vnode, prevVnode) {
      select(el).select("svg").remove();
    },
  });
});
