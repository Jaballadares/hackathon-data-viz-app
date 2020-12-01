import React, { Component } from 'react';
import { VictoryPie } from 'victory';

export class PieChart extends Component {
  render() {
    const { data, theme} = this.props;

    return (
        <VictoryPie
          labelRadius={50}
          style={{labels: { fontSize: '20px' }}}
          data={data}
          theme={theme}
        />
    );
  }
}

export default PieChart;
