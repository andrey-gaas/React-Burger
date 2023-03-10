import * as actions from '../actions/auth';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: {
    registration: false,
    login: false,
  },
  errors: {
    registration: false,
    login: false,
  },
};

function orderReducer(state = initialState, action) {
  switch(action.type) {
    // REGISTRATION
    case actions.FETCH_REGISTRATION:
      return {
        ...state,
        loading: { ...state.loading, registration: true },
        errors: { ...state.errors, registration: false },
      };
    case actions.FETCH_REGISTRATION_FAIL:
      return {
        ...state,
        loading: { ...state.loading, registration: false },
        errors: { ...state.errors, registration: true },
      };
    
    // LOGIN
    case actions.FETCH_LOGIN:
      return {
        ...state,
        loading: { ...state.loading, login: true },
        errors: { ...state.errors, login: false },
      };
    case actions.FETCH_LOGIN_FAIL:
      return {
        ...state,
        loading: { ...state.loading, login: false },
        errors: { ...state.errors, login: true },
      };

    // SUCCESS AUTH
    case actions.FETCH_LOGIN_SUCCESS:
    case actions.FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        loading: { ...state.loading, registration: false, login: false },
      };
    default:
      return state;
  }
}

export default orderReducer;
