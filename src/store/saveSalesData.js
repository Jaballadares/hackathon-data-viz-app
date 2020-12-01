// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_SALES_DATA = 'SAVE_SALES_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export function saveSalesDataAction(salesData) {
  return {
    type: SAVE_SALES_DATA,
    payload: {
      salesData,
    },
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function saveSalesDataReducer(state = initialState, action) {
  if (action.type === SAVE_SALES_DATA) {
    return action.payload.salesData;
  }
  return state;
}
