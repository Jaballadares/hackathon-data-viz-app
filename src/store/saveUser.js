// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_USER = 'SAVE_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function saveUserAction(name) {
  return {
    type: SAVE_USER,
    payload: {
      name,
    },
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 'shirley';
export default function saveUserReducer(state = initialState, action) {
  if (action.type === SAVE_USER ) {
    const newState = Object.assign({}, state);
    return action.payload.name;
  }
  return state;
}
