import { Ref } from "vue";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";

import { IDataChartPie } from "@/types";
import { merge, get, assign, map } from "@/utils";
import { CONFIG, IConfig } from "@/config/defaults.chart-pie";

type TDataChartPie = IDataChartPie<string, number>;
type TArcDatum = d3.PieArcDatum<TDataChartPie>;

// https://observablehq.com/@d3/pie-chart
// https://observablehq.com/@d3/donut-chart
// https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins
// https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("chartPie", {
    // chart steps:
    // @init
    //  1. fetch data, merge config
    //  2. calc. chart dimensions
    //  3. declare scales without domains
    //  4. add svg-canvas, graph, -xAxis, -yAxis
    // @data:updated
    //  5. set domains
    //  6. join data, draw shapes
    //      <selection>
    //       .data(<data$>, <key()>)
    //       .join(<enter()>, <update()>, <exit()>);
    //  -7. draw axis

    // called when the bound element's parent component
    // and all its children are mounted.
    mounted: (el, binding) => {
      const data$: Ref<TDataChartPie[]> = get(binding, "value.data");
      const config: Partial<IConfig> = get(binding, "value.config");
      // merge config
      const {
        width,
        height,
        colors,
        padding,
        // inner radius as percent of outer
        innerRadiusPercent,
        legendWidth,
        legendOffsetX,
        legendOffsetY,
        key,
        value,
        format,
        _canvasOutline,
        _classCanvas,
        _classGraph,
        _classLegend,
        _classPath,
        _padAngle,
        _stroke,
        _strokeLinejoin,
        _strokeWidth,
        _transitionDuration,
      }: IConfig = merge({}, CONFIG, config);

      // @init
      const pieCenter = { x: width / 2, y: height / 2 };
      const outerRadius = Math.min(width, height) / 2 - 2 * padding;
      const innerRadius = innerRadiusPercent * outerRadius;

      // canvas
      const svg = d3
        .select(el)
        .append("svg")
        .style("border", _canvasOutline ? "1px dotted gray" : "none")
        .attr("width", width + legendWidth)
        .attr("height", height)
        .classed(_classCanvas, true);

      // chart container
      const graph = svg
        .append("g")
        .attr("transform", `translate(${pieCenter.x}, ${pieCenter.y})`)
        .classed(_classGraph, true);

      // legend container
      // ⚠ @todo [legend: any]
      const legend: any = svg
        .append("g")
        .attr(
          "transform",
          `translate(${width + padding + legendOffsetX}, ${
            padding + legendOffsetY
          })`
        )
        .classed(_classLegend, true);

      const scaleColor = d3.scaleOrdinal(colors);
      const pieGen = d3
        .pie<TDataChartPie>()
        .value(value)
        .padAngle(_padAngle)
        .sort(null);
      const arcGen = d3
        .arc<TArcDatum>()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const legendGen = legendColor().shape("circle").scale(scaleColor);

      const arctween_enter = (d: TArcDatum) => {
        const i = d3.interpolate(d.endAngle, d.startAngle);
        return (t: number) => {
          d.startAngle = i(t);
          return arcGen(d) || "";
        };
      };
      // ⚠ @todo [n: any]
      const arctween_update = (d: TArcDatum, i: number, n: any) => {
        const i$ = d3.interpolate(get(n[i], "_d"), d);
        assign(n[i], { _d: d });
        return (t: number) => {
          // d.startAngle = i$(t);
          return arcGen(i$(t)) || "";
        };
      };
      // ⚠ @todo [ :any]
      const arctween_exit: any = (d: TArcDatum) => {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return (t: number) => {
          d.startAngle = i(t);
          return arcGen(d) || "";
        };
      };

      // @data:updated
      watchEffect(() => {
        const data = format<TDataChartPie[], TDataChartPie[]>(
          data$.value || []
        );

        scaleColor.domain(map(data, key));

        const paths = graph.selectAll("path").data(pieGen(data));
        const t1 = d3.transition("t1@chartPie").duration(_transitionDuration);
        // [enter]
        paths
          .enter()
          .append("path")
          .attr("stroke", _stroke)
          .attr("stroke-width", _strokeWidth)
          .attr("stroke-linejoin", _strokeLinejoin)
          .attr("fill", (d) => scaleColor(key(d.data)))
          .classed(_classPath, true)
          .each((d, i, coll) => assign(coll[i], { _d: d }))
          .transition()
          .attrTween("d", arctween_enter);
        // [update]
        paths.transition(t1).attrTween("d", arctween_update);
        // [exit]
        paths.exit().transition(t1).attrTween("d", arctween_exit).remove();

        legend.call(legendGen);
      });
    },

    // called when the parent component is unmounted
    unmounted: (el) => {
      d3.select(el).select("svg").remove();
    },
  });
});
