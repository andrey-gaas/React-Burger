import { AppDispatch } from '../../types/store';
import OrderApi from '../../API/OrderApi';
import AuthApi from '../../API/AuthApi';
import { orderActionCreators } from '../actionCreators/order';
import Cookies from '../../utils/cookies';

function fetchOrderThunk(ingredients: string[]) {
  return async function (dispatch: AppDispatch) {
    dispatch(orderActionCreators.fetchOrder());

    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result: any = null;

    if (accessToken && refreshToken) {
      try {
        result = await OrderApi.createOrder(ingredients, accessToken);
        dispatch(orderActionCreators.fetchOrderSuccess(result));
      } catch (error) {
        try {
          const tokens: any = await AuthApi.updateToken(refreshToken, accessToken);
          Cookies.setCookie('token', tokens.accessToken);
          Cookies.setCookie('refresh', tokens.refreshToken);

          result = await OrderApi.createOrder(ingredients, accessToken);
          dispatch(orderActionCreators.fetchOrderSuccess(result));
        } catch (error) {
          dispatch(orderActionCreators.fetchOrderFail());
          Cookies.deleteCookie('token');
          Cookies.deleteCookie('refresh');
        }
      }
    }
  }
}

export default fetchOrderThunk;
