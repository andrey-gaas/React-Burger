import * as actions from '../actions/auth';

const authActionCreators = {
  fetchRegistration: () => ({ type: actions.FETCH_REGISTRATION }),
  fetchRegistrationSuccess: (data) => ({ type: actions.FETCH_REGISTRATION_SUCCESS, data }),
  fetchRegistrationFail: () => ({ type: actions.FETCH_REGISTRATION_FAIL }),

  fetchLogin: () => ({ type: actions.FETCH_LOGIN }),
  fetchLoginSuccess: (data) => ({ type: actions.FETCH_LOGIN_SUCCESS, data }),
  fetchLoginFail: () => ({ type: actions.FETCH_LOGIN_FAIL }),

  logout: () => ({ type: actions.LOGOUT }),
};

export default authActionCreators;
