import { AppDispatch } from '../../types/store';
import AuthApi from '../../API/AuthApi';
import { authActionCreators } from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchEditUser(body: { name: string; email: string; password?: string }) {
  return async function (dispatch: AppDispatch) {
    dispatch(authActionCreators.fetchUserUpdate());
    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result: any = null;

    if (accessToken && refreshToken) {
      try {
        result = await AuthApi.updateUser(accessToken, body);
        dispatch(authActionCreators.fetchUserUpdateSuccess(result.user));
      } catch (error) {
        try {
          const tokens: any = await AuthApi.updateToken(refreshToken, accessToken);
          Cookies.setCookie('token', tokens.accessToken);
          Cookies.setCookie('refresh', tokens.refreshToken);

          result = await AuthApi.updateUser(tokens.accessToken, body);
          dispatch(authActionCreators.fetchUserUpdateSuccess(result.user));
        } catch (error) {
          dispatch(authActionCreators.fetchUserUpdateFail());
          Cookies.deleteCookie('token');
          Cookies.deleteCookie('refresh');
        }
      }
    }
  }
}

export default fetchEditUser;
