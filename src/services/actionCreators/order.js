import * as actions from '../actions/order';

const orderActionCreators = {
  fetchOrder: () => ({ type: actions.FETCH_OREDER }),
  fetchOrderSuccess: (data) => ({ type: actions.FETCH_OREDER_SUCCESS, data }),
  fetchOrderFail: () => ({ tyoe: actions.FETCH_OREDER_FAIL }),
};

export default orderActionCreators;
