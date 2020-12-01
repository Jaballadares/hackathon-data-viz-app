import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryChart, VictoryScatter } from 'victory';
import LoadingSpinner from 'components/LoadingSpinner';
import ScatterChart from '../../../components/ScatterChart';
import PieChart from '../../../components/PieChart';
import BarChart from '../../../components/BarChart';
import LineChart from '../../../components/LineChart';
import classes from './MockupContainer.scss';
import { map, reduce, get } from 'lodash';
import victoryThemeMK from '../../../styles/victoryThemeMK';
import victoryThemeMR from '../../../styles/victoryThemeMR';

@connect(
  (state) => ({
    chartData: state.chartData,
    selectedCharts: state.selectedCharts,
    user: get(state, 'user', 'shirley'),
  })
)
export default class Mockup extends Component {
  render() {
    const { chartData, selectedCharts } = this.props;
    // Project Route is being loaded

    if (false) {
      return <LoadingSpinner />;
    }

    const printTheseCharts = reduce(selectedCharts, (acc, selected, key) => {
      if(selected) {
        acc.push(chartData[key])
      }
      return acc;
    }, []);
    const victoryTheme = this.props.user === 'shirley' ? victoryThemeMK : victoryThemeMR ;


    return (
      <div className={classes.projectWrapper}>
        <header>
          <div className={classes.headerLeft}>
            <p className={classes.neighborhoodName}>Pacific Heights</p>
            <h2 className={classes.graphTitle}>Neighborhood Market Data Report</h2>
          </div>
          <div className={classes.headerRight}>
            <img src={
              this.props.user === 'shirley' ?
              "https://s3-us-west-2.amazonaws.com/s.cdpn.io/99201/MKlogo.png"
              :
              "https://www.mikeramosrealty.com/wp-content/uploads/2017/05/Mike-Ramos-Logo-Color.png"
              }
            alt="" className={classes.logo} />

          </div>
        </header>

        <div className={classes.graphsContainer}>
          {
            map(printTheseCharts, (chart) => {
              let chartInst;
              switch (chart.type) {
                case 'scatter':
                  chartInst = (
                    <ScatterChart
                      theme={victoryTheme}
                      data={chart.coords}
                    />
                  );
                  break;
                case 'bar':
                  chartInst = (
                    <BarChart
                      theme={victoryTheme}
                      data={chart.coords}
                    />
                  );
                  break;
                case 'pie':
                  chartInst = (
                    <PieChart
                      theme={victoryTheme}
                      data={chart.coords}
                    />
                  );
                  break;
                case 'line':
                  chartInst = (
                    <LineChart
                      theme={victoryTheme}
                      data={chart.coords}
                    />
                  );
                  break;
                default:
                  chartInst = null;
              }
              return (
                <div className={classes.chartWrapper}>
                  <h2>{chart.title}</h2>
                  <div className={classes.chart}>
                    {chartInst}
                  </div>
                </div>
              );
            })
          }

        </div>
        <footer>
          <div className={classes.creditsContainer}>
            <p>Market Data Provided by:</p>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/99201/Reside%20Grey%20Web.png" className={classes.footerLogo} height="25px" />
          </div>
        </footer>

      </div>
    );
  }
}
