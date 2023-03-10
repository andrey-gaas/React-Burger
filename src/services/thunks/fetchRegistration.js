import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';
import Cookies from '../../utils/cookies';

function fetchOrderThunk(name, email, password) {
  return async function(dispatch) {
    dispatch(actions.fetchRegistration());

    try {
      const result = await AuthApi.registration(email, password, name);

      if (result.success) {
        Cookies.setCookie('token', result.accessToken, { expires: 43200 });
        Cookies.setCookie('refresh', result.refreshToken, { expires: 43200 });
        dispatch(actions.fetchRegistrationSuccess(result));
      }
    } catch(error) {
      dispatch(actions.fetchRegistrationFail());
    }
  }
}

export default fetchOrderThunk;
