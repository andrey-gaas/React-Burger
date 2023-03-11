import * as actions from '../actions/auth';

const authActionCreators = {
  fetchRegistration: () => ({ type: actions.FETCH_REGISTRATION }),
  fetchRegistrationSuccess: (data) => ({ type: actions.FETCH_REGISTRATION_SUCCESS, data }),
  fetchRegistrationFail: () => ({ type: actions.FETCH_REGISTRATION_FAIL }),

  fetchLogin: () => ({ type: actions.FETCH_LOGIN }),
  fetchLoginSuccess: (data) => ({ type: actions.FETCH_LOGIN_SUCCESS, data }),
  fetchLoginFail: () => ({ type: actions.FETCH_LOGIN_FAIL }),

  fetchUserData: () => ({ type: actions.FETCH_USER_DATA }),
  fetchUserDataSuccess: (data) => ({ type: actions.FETCH_USER_DATA_SUCCESS, data }),
  fetchUserDataFail: () => ({ type: actions.FETCH_USER_DATA_FAIL }),

  logout: () => ({ type: actions.LOGOUT }),
};

export default authActionCreators;
