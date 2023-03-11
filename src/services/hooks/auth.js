import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../selectors';
import actionCreators from '../actionCreators/auth';
import Cookies from '../../utils/cookies';
import fetchUserData from '../thunks/fetchUserData';

function useAuth() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(getUserData);
  const refreshToken = Cookies.getCookie('refresh');

  useEffect(() => {
    if (refreshToken && !user) {
      dispatch(fetchUserData());
    } else {
      dispatch(actionCreators.cancelFetchUserData());
    }
  }, [dispatch, refreshToken, user]);

  return {
    user,
    loading,
  };
};

export default useAuth;
