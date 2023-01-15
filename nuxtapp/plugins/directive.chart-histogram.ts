import { Ref } from "vue";
import * as d3 from "d3";

import { merge, get } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-histogram";

// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
// https://observablehq.com/@d3/histogram
// https://github.com/d3/d3-array#bins
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartHistogram", {
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
        thresholds,
        color,

        yLabel,
        yLabelColor,
        yLabelOffsetX,
        yLabelOffsetY,
        yLabelOpacity,

        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        pad,

        format,

        _canvasOutline,
        _classCanvas,
        _classGraph,
        _classBins,
        _classAxisX,
        _classAxisY,
        _classYLabel,

        _tickSpanHorizontal,
        _tickSpanVertical,

        _transitionDuration,

        _xAxisAnchorText,
        _xAxisTextOpacity,
        _xAxisTextRotationDegrees,

        _xDomain,
      }: IConfig = merge({}, CONFIG, config);

      // @init

      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      const x = d3.scaleLinear([0, innerWidth]);
      const y = d3.scaleLinear([innerHeight, 0]);

      const binsGen = d3.bin().thresholds(thresholds);
      if (_xDomain) binsGen.domain(_xDomain);

      const svg = d3
        .select(el)
        .append("svg")
        .classed(_classCanvas, true)
        .attr("width", width)
        .attr("height", height)
        .style(
          "outline",
          _canvasOutline ? "1px dotted rgba(0,0,0,.22)" : "none"
        );

      const graph = svg
        .append("g")
        .classed(_classGraph, true)
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);

      const xAxis = svg
        .append("g")
        .classed(_classAxisX, true)
        .attr(
          "transform",
          `translate(${paddingLeft}, ${height - paddingBottom})`
        );

      const yAxis = svg
        .append("g")
        .classed(_classAxisY, true)
        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);

      // draw y-label <frequency>
      svg
        .append("g")
        .classed(_classYLabel, true)
        .attr("transform", `translate(${paddingLeft}, 0)`)
        .append("text")
        .attr("x", -14 + yLabelOffsetX)
        .attr("y", 21 + yLabelOffsetY)
        .attr("fill", yLabelColor)
        .attr("fill-opacity", yLabelOpacity)
        .style("font-size", "88%")
        .style("font-style", "italic")
        .text(yLabel);

      // @data:updated
      watchEffect(() => {
        const data = format(data$.value || []);

        const bins = binsGen(data);
        const firstBin = bins[0];
        const lastBin = bins[bins.length - 1];

        x.domain([Number(firstBin.x0), Number(lastBin.x1)]);
        y.domain([0, <number>d3.max(bins.map((b) => b.length))]);

        const t1 = d3
          .transition("t1@chartHistogram")
          .duration(_transitionDuration);

        const B = graph.selectAll("rect").data(bins);

        // [enter]
        B.enter()
          .append("rect")
          .classed(_classBins, true)
          .attr("x", (b) => x(<number>b.x0) + pad)
          .attr("width", (b) =>
            Math.max(0, x(<number>b.x1) - x(<number>b.x0) - pad)
          )
          // .from
          .attr("y", y(0))
          .attr("height", 0)
          .attr("fill", "transparent")
          // .to
          .transition()
          .attr("y", (b) => y(b.length))
          .attr("height", (b) => innerHeight - y(b.length))
          .attr("fill", color);

        // [update]
        B.transition(t1)
          // .to, from-current
          .attr("y", (b) => y(b.length))
          .attr("height", (b) => innerHeight - y(b.length));

        // [exit]
        B.exit()
          .attr("fill", "red")
          .transition()
          // .to, from-current
          .attr("y", y(0))
          .attr("height", 0)
          .attr("fill", "transparent")
          .remove();

        // draw axis

        xAxis.transition().call(
          d3
            .axisBottom(x)
            .ticks(innerWidth / _tickSpanHorizontal)
            .tickSizeOuter(0)
        );

        yAxis.transition().call(
          d3
            .axisLeft(y)
            .ticks(innerHeight / _tickSpanVertical)
            .tickSizeOuter(0)
        );

        // format x-axis text
        xAxis
          .selectAll("text")
          .attr("text-anchor", _xAxisAnchorText)
          .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
          .attr("fill-opacity", _xAxisTextOpacity);
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
