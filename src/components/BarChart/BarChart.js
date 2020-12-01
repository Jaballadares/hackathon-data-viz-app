import React, { Component } from 'react';
import { VictoryChart, VictoryBar } from 'victory';

export class BarChart extends Component {
  render() {
    const { data, theme} = this.props;
    return (
      <VictoryChart
        theme={theme}
        domainPadding={20}
      >
        <VictoryBar
          data={data}
          theme={theme}
        />
      </VictoryChart>
    );
  }
}

export default BarChart;
