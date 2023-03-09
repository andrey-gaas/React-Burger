import * as actions from '../actions/auth';

const authActionCreators = {
  fetchRegistration: () => ({ type: actions.FETCH_REGISTRATION }),
  fetchRegistrationSuccess: (data) => ({ type: actions.FETCH_REGISTRATION_SUCCESS, data }),
  fetchRegistrationFail: () => ({ type: actions.FETCH_REGISTRATION_FAIL }),
};

export default authActionCreators;
