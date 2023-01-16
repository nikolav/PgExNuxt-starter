import { Ref } from "vue";
import * as d3 from "d3";

import { merge, get } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-bar-horizontal";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartBarHorizontal", {
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
      const data$: Ref<any[]> = get(binding, "value.data");
      const config: Partial<IConfig> = get(binding, "value.config");
      // merge config
      const {
        width,
        height,
        color,

        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,

        key,
        value,
        format,

        _classOutline,
        _classCanvas,
        _classGraph,
        _classBars,
        _classXAxis,
        _classYAxis,

        _paddingInner,
        _paddingOuter,

        _tickSpanX,

        _transitionDuration,
      }: IConfig = merge({}, CONFIG, config);

      // @init

      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      const x = d3.scaleLinear().range([0, innerWidth]);
      const y = d3
        .scaleBand()
        .range([0, innerHeight])
        .paddingInner(_paddingInner)
        .paddingOuter(_paddingOuter);

      const svg = d3
        .select(el)
        .append("svg")
        .classed(_classCanvas, true)
        .attr("width", width)
        .attr("height", height)
        .style("outline", _classOutline ? "1px dotted gray" : "none");

      const graph = svg
        .append("g")
        .classed(_classGraph, true)
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);

      const xAxis = svg
        .append("g")
        .classed(_classXAxis, true)
        .attr(
          "transform",
          `translate(${paddingLeft}, ${height - paddingBottom})`
        );

      const yAxis = svg
        .append("g")
        .classed(_classYAxis, true)
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);

      // @data:updated
      watchEffect(() => {
        const data = format(data$.value || []);

        x.domain([0, <number>d3.max(data, value)]);
        y.domain(data.map(key));

        const bars = graph.selectAll("rect").data(data);
        const t1 = d3
          .transition("t1@chartBarHotizontal")
          .duration(_transitionDuration);

        // [enter]
        bars
          .enter()
          .append("rect")
          .classed(_classBars, true)
          .attr("fill", color)
          .attr("x", x(0))
          .attr("y", (d) => <number>y(key(d)))
          .attr("height", y.bandwidth())
          // .from
          .attr("width", 0)
          .attr("fill-opacity", 0)
          .transition()
          // .to
          .attr("width", (d) => x(value(d)) - x(0))
          .attr("fill-opacity", 1);

        // [update]
        // .to, from current, width only
        bars
          .attr("y", (d) => <number>y(key(d)))
          .attr("height", y.bandwidth())
          .transition(t1)
          .attr("width", (d) => x(value(d)) - <number>x(0));

        // [exit]
        bars
          .exit()
          .attr("fill", "red")
          .transition()
          // .to, from current
          .attr("width", 0)
          .attr("fill-opacity", 0)
          .remove();

        // axis

        xAxis.transition().call(
          d3
            .axisBottom(x)
            .ticks(innerWidth / _tickSpanX)
            .tickSizeOuter(0)
        );

        yAxis.call(d3.axisLeft(y).tickSizeOuter(0));
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
