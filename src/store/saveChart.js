// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_CHART = 'SAVE_CHART';

// ------------------------------------
// Actions
// ------------------------------------
export function saveChartAction(key, chartData) {
  return {
    type: SAVE_CHART,
    payload: {
      key,
      chartData,
    },
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function saveChartReducer(state = initialState, action) {
  if (action.type === SAVE_CHART) {
    const newState = Object.assign({}, state);
    newState[action.payload.key] = action.payload.chartData;
    return newState;
  }
  return state;
}
