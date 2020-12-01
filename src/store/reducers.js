import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as form } from 'redux-form';
import locationReducer from './location';
import saveChartReducer from './saveChart';
import saveSelectedReducer from './saveSelected';
import saveSalesDataReduceer from './saveSalesData';
import saveUserReducer from './saveUser';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    location: locationReducer,
    chartData: saveChartReducer,
    selectedCharts: saveSelectedReducer,
    salesData: saveSalesDataReduceer,
    user: saveUserReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
