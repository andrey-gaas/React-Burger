import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchUserData() {
  return async function(dispatch) {
    dispatch(actions.fetchUserData());
    const accessToken = Cookies.getCookie('token');
    const refreshToken = Cookies.getCookie('refresh');
    let result = null;

    try {
      result = await AuthApi.fetchUserData(accessToken);
      dispatch(actions.fetchUserDataSuccess(result.user));
    } catch(error) {
      try {
        const tokens = await AuthApi.updateToken(refreshToken, accessToken);
        Cookies.setCookie('token', tokens.accessToken);

        result = await AuthApi.fetchUserData(tokens.accessToken);
      } catch(error) {
        dispatch(actions.fetchUserDataFail());
      }
    }
  }
}

export default fetchUserData;
