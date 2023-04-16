import { AppDispatch } from '../../types/store';
import AuthApi from '../../API/AuthApi';
import { authActionCreators } from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchLogin(email: string, password: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(authActionCreators.fetchLogin());

    try {
      const result: any = await AuthApi.login(email, password);

      if (result.success) {
        Cookies.setCookie('token', result.accessToken, { expires: 43200 });
        Cookies.setCookie('refresh', result.refreshToken, { expires: 43200 });
        dispatch(authActionCreators.fetchLoginSuccess(result));
      }
    } catch (error) {
      dispatch(authActionCreators.fetchLoginFail());
    }
  }
}

export default fetchLogin;
