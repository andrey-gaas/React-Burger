import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchLogin(email, password) {
  return async function(dispatch) {
    dispatch(actions.fetchLogin());

    try {
      const result = await AuthApi.login(email, password);

      if (result.success) {
        Cookies.setCookie('token', result.accessToken, { expires: 43200 });
        Cookies.setCookie('refresh', result.refreshToken, { expires: 43200 });
        dispatch(actions.fetchLoginSuccess(result));
      }
    } catch(error) {
      dispatch(actions.fetchLoginFail());
    }
  }
}

export default fetchLogin;
