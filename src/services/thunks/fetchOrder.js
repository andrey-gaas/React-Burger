import OrderApi from '../../API/OrderApi';
import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/order';
import Cookies from '../../utils/cookies';

function fetchOrderThunk(ingredients) {
  return async function(dispatch) {
    dispatch(actions.fetchOrder());

    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result = null;

    try {
      result = await OrderApi.createOrder(ingredients, accessToken);
      dispatch(actions.fetchOrderSuccess(result));
    } catch(error) {
      try {
        const tokens = await AuthApi.updateToken(refreshToken, accessToken);
        Cookies.setCookie('token', tokens.accessToken);
        Cookies.setCookie('refresh', tokens.refreshToken);

        result = await OrderApi.createOrder(ingredients, accessToken);
        dispatch(actions.fetchOrderSuccess(result));
      } catch(error) {
        dispatch(actions.fetchOrderFail());
        Cookies.deleteCookie('token');
        Cookies.deleteCookie('refresh');
      }
    }
  }
}

export default fetchOrderThunk;
