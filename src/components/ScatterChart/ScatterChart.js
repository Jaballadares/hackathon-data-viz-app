import React, { Component } from 'react';
import { VictoryChart, VictoryScatter, VictoryTooltip } from 'victory';

export class ScatterChart extends Component {
  render() {
    const { data, theme} = this.props;

    return (
      <VictoryChart
        theme={theme}
        domainPadding={20}
      >
        <VictoryScatter
          labelComponent={<VictoryTooltip height={30} flyoutStyle={{ fill: '#eeedef', fillOpacity: '0.9' }} />}
          size={3}
          data={data}
          theme={theme}
        />
      </VictoryChart>
    );
  }
}

export default ScatterChart;
