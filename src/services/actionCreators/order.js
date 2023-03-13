import * as actions from '../actions/order';

const orderActionCreators = {
  fetchOrder: () => ({ type: actions.FETCH_ORDER }),
  fetchOrderSuccess: (data) => ({ type: actions.FETCH_ORDER_SUCCESS, data }),
  fetchOrderFail: () => ({ type: actions.FETCH_ORDER_FAIL }),
  
  closeCreatedOrder: () => ({ type: actions.CLOSE_CREATED_ORDER }),
};

export default orderActionCreators;
