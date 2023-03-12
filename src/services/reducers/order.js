import * as actions from '../actions/order';

const initialState = {
  createdOrder: null,
  hasError: false,
  loading: false,
};

function orderReducer(state = initialState, action) {
  switch(action.type) {
    case actions.FETCH_ORDER:
      return { ...state, hasError: false, loading: true };
    case actions.FETCH_ORDER_SUCCESS:
      return { ...state, hasError: false, loading: false, createdOrder: action.data };
    case actions.FETCH_ORDER_FAIL:
      return { ...state, hasError: true, loading: false };

    case actions.CLOSE_CREATED_ORDER:
      return { ...state, createdOrder: null };
    default:
      return state;
  }
}

export default orderReducer;
