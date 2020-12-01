import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Theme from 'theme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { get, map } from 'lodash';
import { paths } from 'constants';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import GenericChart from '../GenericChart';
import getSalesData from './salesData';
import { saveSelectedAction, clearSelectedAction } from '../../../../store/saveSelected.js';
import { saveSalesDataAction } from '../../../../store/saveSalesData.js';
import classes from './Home.scss';
import victoryThemeMK from '../../../../styles/victoryThemeMK';
import victoryThemeMR from '../../../../styles/victoryThemeMR';

// BONUS TODO - validator on zipcodes

const chartSpecs = [
  // { type: 'scatter', title: 'Sale price over time', subtitle: 'Based on Sale Date', coordParams: { x: 'saleDate', y: 'salePrice' }},
  { type: 'pie', title: 'Percent over listing price', subtitle: 'Percentage of sales over listing price', coordParams: { custom: true, id: 2 }},
  { type: 'line', title: 'Average sale price over time', subtitle: 'Average per month based on Sale Date', coordParams: { custom: true, id: 3 }},
  { type: 'scatter', title: 'Sale Price over latitude', subtitle: 'How price changes as you move further north', coordParams: { x: 'coordinates.latitude', y: 'salePrice' }},
  // sales month to month x: saleDate (month), y: sum
  { type: 'line', title: 'Sales month to month', subtitle: 'Sales in months', coordParams: { custom: true, id: 1 }},
  // pie: over listing price, at or under
  { type: 'line', title: 'Days on Market over time', subtitle: 'Based on list date', coordParams: { x: 'listingDate', y: 'daysOnMarket' }},
];

@connect((state) => ({
    salesData: state.salesData,
    user: get(state, 'user', 'shirley'),
  }),
  { saveSelectedAction, clearSelectedAction, saveSalesDataAction }
)
export class Home extends Component {
  state = {
    zip: '',
    salesData: null,
    selected: {},
  }

  componentDidMount = () => {
    this.props.clearSelectedAction();
  }

  handleChange = (e) => {
    this.setState({ zip: e.target.value });
  }

  makeAPICall = () => {
    this.setState({ getStarted: true });
    getSalesData({
      uri: 'https://slipstream.homejunction.com/ws/sales/search?',
      params: {
        market: 'sfar',
        pageSize: 1000,
        zip: this.state.zip,
        saleDate: '>01/01/2017'
      },
    })
    .then(salesData => {
      return Promise.all([
        this.setState({ salesData }),
        this.props.saveSalesDataAction(salesData),
      ]);
    });
  }

  toggleSelected = (key) => {
    const newSelected = Object.assign({}, this.state.selected);
    const newValue = !newSelected[key];
    newSelected[key] = newValue;
    this.setState({ selected: newSelected });
    this.props.saveSelectedAction(key, newValue);
  }

  // https://slipstream.homejunction.com/ws/sales/statistics/measure?market=sfar&measurements=listPrice,salePrice&zip=94107
  // https://slipstream.homejunction.com/ws/sales/search?market=sfar&zip=94107

  render() {
    const victoryTheme = this.props.user === 'shirley' ? victoryThemeMK : victoryThemeMR ;
    // const { router: { push } } = this.context;
    return (
      <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
        <div className="flex-row-center">
          <div className={classes.section}>
            <TextField
              hintText="Enter zip"
              value={this.state.zip}
              onChange={this.handleChange}
              style={{ marginRight: '2rem' }}
            />
            <div className="baloney">
              <RaisedButton
                label="Submit Query"
                className={classes.button}
                onClick={this.makeAPICall}
                secondary
              />
            </div>
            <Link to={paths.mockup}>
              <RaisedButton
                className={classes.button}
                label="Export"
                primary
              />
            </Link>
          </div>
        </div>
        <div className={classes.chartSection} >
        {
          this.state.salesData || this.props.salesData
          ?
            map(chartSpecs, (chartMeta, idx) => {
              const key = `${chartMeta.type}-${idx}`;
              return (
                <GenericChart
                  key={key}
                  chartKey={key}
                  salesData={this.state.salesData || this.props.salesData}
                  chartMeta={chartMeta}
                  onChartSelect={() => this.toggleSelected(key)}
                  selected={get(this.state.selected, key, false)}
                  victoryTheme={victoryTheme}
                />
              );
            })
          :
            (this.state.getStarted ? <LoadingSpinner /> : null)
        }
        </div>
      </div>
    );
  }
}

export default Home;
