import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';

function fetchLogin(email, password) {
  return async function(dispatch) {
    dispatch(actions.fetchLogin());

    try {
      const result = await AuthApi.login(email, password);

      if (result.success) {
        dispatch(actions.fetchLoginSuccess(result));
      }
    } catch(error) {
      dispatch(actions.fetchLoginFail());
    }
  }
}

export default fetchLogin;
