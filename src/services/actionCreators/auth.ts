import * as actions from '../actions/auth';
import { IUser } from '../../types/auth';

type TUserResponse = {
  user: IUser;
}

interface IUserSuccessAction {
  readonly type: typeof actions.FETCH_REGISTRATION_SUCCESS | typeof actions.FETCH_LOGIN_SUCCESS;
  readonly data: TUserResponse;
}

interface IUserUpdateSuccessAction {
  readonly type: typeof actions.FETCH_USER_DATA_SUCCESS | typeof actions.FETCH_USER_UPDATE_SUCCESS;
  readonly data: IUser;
}

interface IAuthActions {
  readonly type:
  typeof actions.FETCH_REGISTRATION |
  typeof actions.FETCH_REGISTRATION_FAIL |
  typeof actions.FETCH_LOGIN |
  typeof actions.FETCH_LOGIN_FAIL |
  typeof actions.FETCH_USER_DATA |
  typeof actions.FETCH_USER_DATA_FAIL |
  typeof actions.CANCEL_FETCH_USER_DATA |
  typeof actions.FETCH_USER_UPDATE |
  typeof actions.FETCH_USER_UPDATE_FAIL |
  typeof actions.LOGOUT;
}

export type TAuthActionCreators = IUserSuccessAction | IUserUpdateSuccessAction | IAuthActions;

export const authActionCreators = {
  fetchRegistration: (): TAuthActionCreators => ({ type: actions.FETCH_REGISTRATION }),
  fetchRegistrationSuccess: (data: TUserResponse): TAuthActionCreators => ({ type: actions.FETCH_REGISTRATION_SUCCESS, data }),
  fetchRegistrationFail: (): TAuthActionCreators => ({ type: actions.FETCH_REGISTRATION_FAIL }),

  fetchLogin: (): TAuthActionCreators => ({ type: actions.FETCH_LOGIN }),
  fetchLoginSuccess: (data: TUserResponse): TAuthActionCreators => ({ type: actions.FETCH_LOGIN_SUCCESS, data }),
  fetchLoginFail: (): TAuthActionCreators => ({ type: actions.FETCH_LOGIN_FAIL }),

  fetchUserData: (): TAuthActionCreators => ({ type: actions.FETCH_USER_DATA }),
  fetchUserDataSuccess: (data: IUser): TAuthActionCreators => ({ type: actions.FETCH_USER_DATA_SUCCESS, data }),
  fetchUserDataFail: (): TAuthActionCreators => ({ type: actions.FETCH_USER_DATA_FAIL }),
  cancelFetchUserData: (): TAuthActionCreators => ({ type: actions.CANCEL_FETCH_USER_DATA }),

  fetchUserUpdate: (): TAuthActionCreators => ({ type: actions.FETCH_USER_UPDATE }),
  fetchUserUpdateSuccess: (data: IUser): TAuthActionCreators => ({ type: actions.FETCH_USER_UPDATE_SUCCESS, data }),
  fetchUserUpdateFail: (): TAuthActionCreators => ({ type: actions.FETCH_USER_UPDATE_FAIL }),

  logout: (): TAuthActionCreators => ({ type: actions.LOGOUT }),
};

