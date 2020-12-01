import React, { Component } from 'react';
import { VictoryChart, VictoryLine } from 'victory';

export class LineChart extends Component {
  render() {
    const { data, theme} = this.props;

    return (
      <VictoryChart
        theme={theme}
        domainPadding={20}
      >
        <VictoryLine
          data={data}
          theme={theme}
        />
      </VictoryChart>
    );
  }
}

export default LineChart;
