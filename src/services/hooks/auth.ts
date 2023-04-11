import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getUserData } from '../selectors';
import { authActionCreators } from '../actionCreators/auth';
import Cookies from '../../utils/cookies';
import fetchUserData from '../thunks/fetchUserData';

interface IUseAuthResult {
  user: any;
  loading: boolean;
  error: boolean;
};

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

function useAuth(): IUseAuthResult {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, error } = useSelector(getUserData);
  const refreshToken = Cookies.getCookie('refresh');

  useEffect(() => {
    if (refreshToken && !user) {
      dispatch(fetchUserData());
    } else {
      dispatch(authActionCreators.cancelFetchUserData());
    }
  }, [dispatch, refreshToken, user]);

  return {
    user,
    loading,
    error,
  };
};

export default useAuth;
