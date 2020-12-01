import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { get, map, filter, includes, lowerCase, reduce, isNumber, sortBy, floor, set } from 'lodash';
import moment from 'moment';
import classes from './GenericChart.scss';
import ScatterChart from '../../../../components/ScatterChart';
import PieChart from '../../../../components/PieChart';
import BarChart from '../../../../components/BarChart';
import LineChart from '../../../../components/LineChart';
import { saveChartAction } from '../../../../store/saveChart.js';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@connect(null, { saveChartAction })
export class GenericChart extends Component {
  state = {
    coords: [{ x: 0, y: 0 }],
  }

  componentWillMount() {
    const {
      chartKey,
      salesData,
      chartMeta,
    } = this.props;
    const { coordParams: { x, y }, type } = chartMeta;
    let coords;
    const custom = get(chartMeta, 'coordParams.custom');
    const id = get(chartMeta, 'coordParams.id');
    if (custom) {
      if (id === 1) {
        // sales month to month
        const months = reduce(salesData, (acc, sale) => {
          const theDate = new Date(sale.saleDate*1000);
          // console.log(sale.saleDate, theDate, `${.getMonth()} ${.getYear()}`);
          const monthString = theDate.getMonth();
          acc[monthString] = isNumber(acc[monthString]) ? acc[monthString] + 1 : 0;
          return acc;
        }, {});
        const unsortedCoords = map(months, (num, mon) => {
          return { x: mon, y: num };
        })
        const sortedCoords = sortBy(unsortedCoords, o => o.x);
        coords = map(sortedCoords, ({x,y}) => {
          return { x: monthNames[x], y };
        });

      } else if (id === 2) {
        // Percent
        const percents = reduce(salesData, (acc, sale) => {
          if (sale.salePrice > sale.listPrice) {
            acc['Above List Price'] += 1;
          }
          acc['At or Below List Price'] += 1;
          return acc;
        }, { 'Above List Price': 0, 'At or Below List Price': 0 });
        const above = percents['Above List Price'];
        const other = percents['At or Below List Price'];
        const sum = above+other;
        coords = [
          { x: 'At or Below List Price', y: other / sum, label: `${floor((other/sum)*100)}%` },
          { x: 'Above List Price', y: above / sum, label: `${floor((above/sum)*100)}%` },
        ];
      } else if (id === 3) {
        // sales month to month
        const months = reduce(salesData, (acc, sale) => {
          const theDate = new Date(sale.saleDate*1000);
          // console.log(sale.saleDate, theDate, `${.getMonth()} ${.getYear()}`);
          const monthString = theDate.getMonth();
          console.log(monthString, acc[monthString], get(acc[monthString], 'num'));
          set(acc, `${monthString}.num`, isNumber(get(acc[monthString], 'num')) ? acc[monthString].num + 1 : 0);
          set(acc, `${monthString}.sum`, isNumber(get(acc[monthString], 'sum')) ? acc[monthString].sum + sale.salePrice : 0);
          return acc;
        }, {});
        console.log('lzz', months);
        const unsortedCoords = map(months, ({num, sum}, mon) => {
          return { x: mon, y: num/sum };
        })
        const sortedCoords = sortBy(unsortedCoords, o => o.x);
        coords = map(sortedCoords, ({x,y}) => {
          return { x: monthNames[x], y };
        });
        console.log(coords);
      }
    }
    else {
      const preCoords = map(salesData, (sale) => {
        const xValue = get(sale, x);
        const yValue = get(sale, y);

          const formattedX =
            includes(lowerCase(x), 'price') ?
              '$'+xValue
            :
              (includes(lowerCase(x), 'date') ?
                moment.unix(xValue).format('MM-DD-YYYY')
              :
                xValue);
          const formattedY =
            includes(lowerCase(y), 'price') ?
              '$'+yValue
            :
              (includes(lowerCase(y), 'date') ?
                moment.unix(yValue).format('MM-DD-YYYY')
              :
                yValue);
          return {
            x: xValue,
            y: yValue,
            label: type === 'scatter' ? `${formattedX}, ${formattedY}`: null,
          };
      });
      coords = filter(preCoords, (c) => {
        return !!c.x && !!c.y;
      });
    }
    console.log(coords);
    this.setState({ coords });
    this.props.saveChartAction(chartKey, {...chartMeta, coords });
  }

  render() {
    const { chartMeta: { title, subtitle, type }, selected, onChartSelect, victoryTheme} = this.props;

    const cardOverlay = (
      <CardTitle title={title} subtitle={subtitle} >
        { selected ? <DoneIcon style={{ float: 'right', color: 'white' }}/> : null }
      </CardTitle>
    );

    let chartInst;
    switch (type) {
      case 'scatter':
        chartInst = (
          <ScatterChart
            theme={victoryTheme}
            data={this.state.coords}
          />
        );
        break;
      case 'bar':
        chartInst = (
          <BarChart
            theme={victoryTheme}
            data={this.state.coords}
          />
        );
        break;
      case 'pie':
        chartInst = (
          <PieChart
            theme={victoryTheme}
            data={this.state.coords}
          />
        );
        break;
      case 'line':
        chartInst = (
          <LineChart
            theme={victoryTheme}
            data={this.state.coords}
          />
        );
        break;
      default:
        chartInst = null;
    }

    return (
      <div className={classes.container} onClick={onChartSelect}>
        <Card style={{ margin: '2rem' }}>
          <CardMedia
            overlay={cardOverlay}
          >
            <div className={classes.chartWrap}>
              {chartInst}
            </div>
          </CardMedia>
        </Card>
      </div>
    );
  }
}

export default GenericChart;
