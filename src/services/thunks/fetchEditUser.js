import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchUserData(body) {
  return async function(dispatch) {
    dispatch(actions.fetchUserUpdate());
    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result = null;

    try {
      result = await AuthApi.updateUser(accessToken, body);
      dispatch(actions.fetchUserUpdateSuccess(result.user));
    } catch(error) {
      try {
        const tokens = await AuthApi.updateToken(refreshToken, accessToken);
        Cookies.setCookie('token', tokens.accessToken);
        Cookies.setCookie('refresh', tokens.refreshToken);

        result = await AuthApi.updateUser(tokens.accessToken, body);
        dispatch(actions.fetchUserUpdateSuccess(result.user));
      } catch(error) {
        dispatch(actions.fetchUserUpdateFail());
        Cookies.deleteCookie('token');
        Cookies.deleteCookie('refresh');
      }
    }
  }
}

export default fetchUserData;
