import * as actions from '../actions/auth';
import { IAuth } from '../../types/auth';
import { TAuthActionCreators } from '../actionCreators/auth';

const initialState: IAuth = {
  user: null,
  loading: {
    registration: false,
    login: false,
    user: true,
    update: false,
  },
  errors: {
    registration: false,
    login: false,
    user: false,
    update: false,
  },
};

function orderReducer(state = initialState, action: TAuthActionCreators): IAuth {
  switch (action.type) {
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

    // USER DATA
    case actions.FETCH_USER_DATA:
      return {
        ...state,
        loading: { ...state.loading, user: true },
        errors: { ...state.errors, user: false },
      };
    case actions.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        user: action.data,
      };
    case actions.FETCH_USER_DATA_FAIL:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        errors: { ...state.errors, user: true },
      };
    case actions.CANCEL_FETCH_USER_DATA:
      return { ...state, loading: { ...state.loading, user: false } };

    // USER UPDATE
    case actions.FETCH_USER_UPDATE:
      return {
        ...state,
        loading: { ...state.loading, update: true },
        errors: { ...state.errors, update: false },
      };
    case actions.FETCH_USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        user: action.data,
      };
    case actions.FETCH_USER_UPDATE_FAIL:
      return {
        ...state,
        loading: { ...state.loading, update: false },
        errors: { ...state.errors, update: true },
      };

    // LOGOUT
    case actions.LOGOUT:
      return { ...state, user: null };

    // SUCCESS AUTH
    case actions.FETCH_LOGIN_SUCCESS:
    case actions.FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        loading: { ...state.loading, registration: false, login: false },
      };
    default:
      return state;
  }
}

export default orderReducer;
