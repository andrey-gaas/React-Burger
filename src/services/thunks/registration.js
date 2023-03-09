import AuthApi from '../../API/AuthApi';
import actions from '../actionCreators/auth';

function fetchOrderThunk(name, email, password) {
  return async function(dispatch) {
    dispatch(actions.fetchRegistration());

    try {
      const result = await AuthApi.registration(email, password, name);

      if (result.success) {
        dispatch(actions.fetchRegistrationSuccess(result));
      }
    } catch(error) {
      dispatch(actions.fetchRegistrationFail());
    }
  }
}

export default fetchOrderThunk;
