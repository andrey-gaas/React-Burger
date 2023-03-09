import * as actions from '../actions/auth';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: {
    registration: false,
  },
  errors: {
    registration: false,
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
    case actions.FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        loading: { ...state.loading, registration: false },
      };
    case actions.FETCH_REGISTRATION_FAIL:
      return {
        ...state,
        loading: { ...state.loading, registration: false },
        errors: { ...state.errors, registration: true },
      };
    default:
      return state;
  }
}

export default orderReducer;
