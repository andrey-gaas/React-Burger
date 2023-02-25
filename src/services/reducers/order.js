import * as actions from '../actions/order';

const initialState = {
  data: null,
  hasError: false,
  loading: false,
};

function orderReducer(state = initialState, action) {
  switch(action.type) {
    case actions.FETCH_OREDER:
      return { ...state, hasError: false, loading: true };
    case actions.FETCH_OREDER_SUCCESS:
      return { ...state, hasError: false, loading: false, data: action.data };
    case actions.FETCH_OREDER_FAIL:
      return { ...state, hasError: true, loading: false };
    default:
      return state;
  }
}

export default orderReducer;
