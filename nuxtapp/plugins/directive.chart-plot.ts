import { Ref } from "vue";
import * as d3 from "d3";
import { merge, get, map } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-plot";
import { IDataChartPlot } from "@/types";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartPlot", {
    mounted: (el, binding) => {
      const data$: Ref<IDataChartPlot[]> = get(binding, "value.data");
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
        //
        key,
        value,
        format,
        xScale,
        yScale,
        //
        _xAxisTextRotationDegrees,
        _xAxisTextOpacity,
        _xAxisAnchorText,
        _dotRadius,
        _tickSpanHorizontal,
        _tickSpanVertical,

        //
        _classCanvas,
        _classGraph,
        _classAxisX,
        _classAxisY,
        _classDots,
        _classGuide,
        _transitionDuration,
        _guideHorizontalOpacity,
      }: IConfig = merge({}, CONFIG, config);

      // @init

      const innerWidth = width - paddingLeft - paddingRight;
      const innerHeight = height - paddingTop - paddingBottom;

      const x = xScale().range([0, innerWidth]);
      const y = yScale().range([innerHeight, 0]);

      const svg = d3
        .select(el)
        .append("svg")
        .classed(_classCanvas, true)
        .attr("width", width)
        .attr("height", height);
      // .style("border", "1px dotted grey")

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

      // @data:updated
      watchEffect(() => {
        const data = format<IDataChartPlot[], IDataChartPlot[]>(
          data$.value || []
        );

        x.domain(map(data, key));
        y.domain([0, Math.max(...data.map(value))]);

        const t1 = d3.transition("t1@chartPlot").duration(_transitionDuration);
        const dots = graph.selectAll("circle").data(data);

        // [enter]
        dots
          .enter()
          .append("circle")
          .classed(_classDots, true)
          .attr("r", _dotRadius)
          .attr("cx", (d) => (x(key(d)) as number) + x.bandwidth() / 2)
          .attr("fill", color)
          // .from
          .attr("cy", y(0))
          .attr("fill-opacity", 0)
          .transition()
          // .to
          .attr("cy", (d) => y(value(d)))
          .attr("fill-opacity", 1);

        // [update]
        dots
          .transition(t1)
          .attr("cx", (d) => (x(key(d)) as number) + x.bandwidth() / 2)
          .attr("cy", (d) => y(value(d)));

        // [exit]
        dots
          .exit()
          // .from
          .attr("fill", "#ff0000")
          .transition()
          // .to
          .attr("fill-opacity", 0)
          .attr("cy", y(0))
          .remove();

        // axis
        xAxis.transition().call(
          d3
            .axisBottom(x)
            .ticks(innerWidth / _tickSpanHorizontal)
            .tickSizeOuter(0)
        );

        // format y-axis, remove .domain, add horizontal guides
        yAxis
          // .transition()
          .call(
            d3
              .axisLeft(y)
              .ticks(innerHeight / _tickSpanVertical)
              .tickSizeOuter(0)
          )
          .call((g) => g.select(".domain").remove())
          .call((g) => {
            g.selectAll(`.tick line.${_classGuide}`).remove();
            g.selectAll(".tick line")
              .clone()
              .classed(_classGuide, true)
              .attr("x2", innerWidth)
              .attr("stroke-opacity", _guideHorizontalOpacity);
          });

        // format x-axis text
        xAxis
          .selectAll("text")
          .attr("text-anchor", _xAxisAnchorText)
          .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
          .attr("fill-opacity", _xAxisTextOpacity);
      });
    },
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
