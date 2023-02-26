import * as actions from '../actions/order';

const orderActionCreators = {
  fetchOrder: () => ({ type: actions.FETCH_OREDER }),
  fetchOrderSuccess: (data) => ({ type: actions.FETCH_OREDER_SUCCESS, data }),
  fetchOrderFail: () => ({ type: actions.FETCH_OREDER_FAIL }),
  
  closeCreatedOrder: () => ({ type: actions.CLOSE_CREATED_ORDER }),
};

export default orderActionCreators;
