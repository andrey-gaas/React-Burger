import OrderApi from '../../API/OrderApi';
import actions from '../actionCreators/order';

function fetchOrderThunk(ingredients) {
  return async function(dispatch) {
    dispatch(actions.fetchOrder());

    try {
      const result = await OrderApi.createOrder(ingredients);
      dispatch(actions.fetchOrderSuccess(result.data));
    } catch(error) {
      dispatch(actions.fetchOrderFail());
    }
  }
}

export default fetchOrderThunk;
