import { Ref } from "vue";
import * as d3 from "d3";

import { IDataChartLine } from "@/types";
import { merge, get } from "@/utils";
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
      const {
        width,
        height,
        color,
        fill,
        key,
        value,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        strokeLinecap,
        strokeLinejoin,
        strokeOpacity,
        strokeWidth,
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

      // chart dimensions
      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      // scales, no domain
      const x = xScale().range([0, innerWidth]);
      const y = yScale().range([innerHeight, 0]);

      // line generator, [d]
      const lineGen = d3
        .line<IDataChartLine>()
        .curve(_curve)
        .x((d) => x(key(d)))
        .y((d) => y(value(d)));

      const svg = d3
        .select(el)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        // .style("border", "1px dotted grey")
        .classed(_classCanvas, true);

      const graph = svg
        .append("g")
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
        .classed(_classGraph, true);

      const path = graph
        .append("path")
        .attr("fill", fill)
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .classed(_classPath, true);

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
        .call((g) =>
          g
            .append("text")
            .attr("x", yLabelOffsetX)
            .attr("y", yLabelOffsetY)
            .attr("fill", yLabelColor)
            .attr("text-anchor", "start")
            .classed(_classYLabel, true)
            .text(yLabel)
        )
        .classed(_classYAxis, true);

      // @data:updated
      watchEffect(() => {
        const data = data$.value || [];

        x.domain(d3.extent(data, key));
        y.domain([0, d3.max(data, value)]);

        // draw line
        path
          .transition()
          .duration(_transitionDuration)
          .attr("d", lineGen(data));

        // run axis
        xAxis
          // .transition()
          // # draw ticks
          .call(
            d3
              .axisBottom(x)
              .ticks(width / _tickSpanHorizontal)
              .tickFormat(_xAxisTextFormat)
              .tickSizeOuter(_tickSizeOuter)
          )
          // # format axis text
          .call((g) =>
            g
              .selectAll("text")
              .attr("text-anchor", _xAxisTextAnchor)
              .attr("fill-opacity", _xAxisTextOpacity)
              .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
          );

        yAxis
          // .transition()
          // # draw ticks
          .call(
            d3
              .axisLeft(y)
              .ticks(height / _tickSpanVertical)
              .tickFormat(_yAxisTextFormat)
          )
          // # remove vertical axis
          .call((g) => g.select(".domain").remove())
          // # draw horizontal guides
          .call((g) => {
            g.selectAll(`.tick line.${_classGuide}`).remove();
            g.selectAll(".tick line")
              .clone()
              .attr("x2", innerWidth)
              .attr("stroke-opacity", _guideHorizontalOpacity)
              .classed(_classGuide, true);
          });
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
