import { assign } from 'lodash';
// Colors
const black = "#241F20";
const grey = "#6990BA";
const gold = "#694767";
const lightGrey = "#51384f";
const lightGreen = "#9CBEDC";
const colors = [
  grey,
  gold,
  lightGrey,
  lightGreen
];

// Typography
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
// Layout
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50
};
// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize: '6px',
  fontWeight: 300,
  letterSpacing: '1px',
  padding
};
const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
// Strokes
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";
// Put it all together...
export default{
  area: assign({
    style: {
      data: {
        fill: grey
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: assign({
    style: {
      axis: {
        fill: "transparent",
        stroke:  'white',
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: assign({}, centeredLabelStyles, {
        padding,
        stroke: "transparent"
      }),
      grid: {
        fill: "transparent",
        stroke: "none",
        strokeDasharray,
        strokeLinecap,
      },
      tickLabels: assign({}, baseLabelStyles, {
        fill: black,
        stroke: "transparent"
      })
    }
  }, baseProps),
  bar: assign({
    style: {
      data: {
        fill: gold,
        fillOpacity: 0.6,
        padding,
        stroke: "transparent",
        strokeWidth: 0,
        width: 20
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  candlestick: assign({
    style: {
      data: {
        stroke: gold
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: "#ffffff",
      negative: gold
    }
  }, baseProps),
  chart: baseProps,
  errorbar: assign({
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: gold,
        strokeWidth: 2
      },
      labels: assign({}, centeredLabelStyles, {
        stroke: "transparent",
        strokeWidth: 0
      })
    }
  }, baseProps),
  group: assign({
    colorScale: colors
  }, baseProps),
  line: assign({
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: gold,
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        stroke: "transparent",
        strokeWidth: 0,
        textAnchor: "start"
      })
    }
  }, baseProps),
  pie: assign({
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: "white",
        strokeWidth: 4,
      },
      labels: assign({}, baseLabelStyles, {
        padding: 20,
        stroke: "transparent",
        strokeWidth: 0
      })
    }
  }, baseProps),
  scatter: assign({
    style: {
      data: {
        fill: gold,
        opacity: 1,
        stroke: "transparent",
        strokeWidth: 0,
      },
      labels: assign({}, centeredLabelStyles, {
        stroke: "transparent"
      })
    }
  }, baseProps),
  stack: assign({
    colorScale: colors
  }, baseProps),
  tooltip: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles,
      flyout: {
        stroke: gold,
        strokeWidth: 1,
        fill: "#f0f0f0"
      }
    },
    flyoutProps: {
      cornerRadius: 10,
      pointerLength: 10
    }
  }, baseProps),
  voronoi: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  }, baseProps)
};
