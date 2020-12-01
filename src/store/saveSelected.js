// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_SELECTED = 'SAVE_SELECTED';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

// ------------------------------------
// Actions
// ------------------------------------
export function clearSelectedAction() {
  return {
    type: CLEAR_SELECTED,
  };
}
export function saveSelectedAction(key, value) {
  return {
    type: SAVE_SELECTED,
    payload: {
      key,
      value,
    },
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function saveSelectedReducer(state = initialState, action) {
  if (action.type === CLEAR_SELECTED) {
    return initialState;
  } else if (action.type === SAVE_SELECTED) {
    const newState = Object.assign({}, state);
    newState[action.payload.key] = action.payload.value;
    return newState;
  }
  return state;
}
