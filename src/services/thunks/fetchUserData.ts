import { AppDispatch } from '../../types/store';
import AuthApi from '../../API/AuthApi';
import { authActionCreators } from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchUserData() {
  return async function (dispatch: AppDispatch) {
    dispatch(authActionCreators.fetchUserData());
    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result: any = null;

    if (accessToken && refreshToken) {
      try {
        result = await AuthApi.fetchUserData(accessToken);
        dispatch(authActionCreators.fetchUserDataSuccess(result.user));
      } catch (error) {
        try {
          const tokens: any = await AuthApi.updateToken(refreshToken, accessToken);
          Cookies.setCookie('token', tokens.accessToken);
          Cookies.setCookie('refresh', tokens.refreshToken);

          result = await AuthApi.fetchUserData(tokens.accessToken);
          dispatch(authActionCreators.fetchUserDataSuccess(result.user));
        } catch (error) {
          dispatch(authActionCreators.fetchUserDataFail());
          Cookies.deleteCookie('token');
          Cookies.deleteCookie('refresh');
        }
      }
    }
  }
}

export default fetchUserData;
