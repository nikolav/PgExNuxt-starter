import * as d3 from "d3";

import { IDataChartArea } from "@/types";
import { CONFIG, TConfig } from "@/config/defaults.chart-area";
import { merge, get } from "@/utils";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartArea", {
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
      const data$ = get(binding, "value.data");
      const config: Partial<TConfig> = get(binding, "value.config");
      // merge config
      const {
        key,
        value,
        width,
        height,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        fill,
        curve,
        format,
        //
        _classCanvas,
        _classGraph,
        _classXAxis,
        _classYAxis,
        _classPath,
        //
        _transitionDuration,
        //
        _tickSpanHorizontal,
        _tickSpanVertical,
        _tickSizeOuter,
        //
        _xAxisTextFormat,
        _xAxisTextAnchor,
        _xAxisTextOpacity,
        _xAxisTextRotationDegrees,
        _yAxisTextFormat,
      }: TConfig = merge({}, CONFIG, config);

      // @init

      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      const x = d3.scaleLinear().range([0, innerWidth]);
      const y = d3.scaleLinear().range([innerHeight, 0]);

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

      const path = graph
        .append("path")
        .attr("fill", fill)
        .classed(_classPath, true);

      const genArea = d3
        .area<IDataChartArea>()
        .curve(curve)
        .x((d) => x(key(d)))
        .y0(y(0))
        .y1((d) => y(value(d)));

      // @data:updated
      watchEffect(() => {
        const data = format(data$?.value);

        const items = data.reduce(
          (res, d) => {
            res.keys.push(key(d));
            res.values.push(value(d));
            return res;
          },
          { keys: <number[]>[], values: <number[]>[] }
        );

        x.domain([Math.min(...items.keys), Math.max(...items.keys)]).nice();
        y.domain([0, Math.max(...items.values)]);

        path
          .transition()
          .duration(_transitionDuration)
          .attr("d", genArea(data));

        // axis
        xAxis
          .call(
            d3
              .axisBottom(x)
              .ticks(width / _tickSpanHorizontal)
              .tickFormat(_xAxisTextFormat)
              .tickSizeOuter(_tickSizeOuter)
          )
          .call((g) =>
            g
              .selectAll("text")
              .attr("text-anchor", _xAxisTextAnchor)
              .attr("fill-opacity", _xAxisTextOpacity)
              .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
          );

        yAxis.call(
          d3
            .axisLeft(y)
            .ticks(height / _tickSpanVertical)
            .tickFormat(_yAxisTextFormat)
        );
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
