import { TStore } from '../../types/store';

export const getIngredients = (state: TStore) => state.ingredients;
export const getOrder = (state: TStore) => state.orders;
export const getRegistrationData = (state: TStore) => ({
  loading: state.auth.loading.registration,
  error: state.auth.errors.registration,
  user: state.auth.user,
});
export const getLoginData = (state: TStore) => ({
  loading: state.auth.loading.login,
  error: state.auth.errors.login,
  user: state.auth.user,
});
export const getUserData = (state: TStore) => ({
  loading: state.auth.loading.user,
  error: state.auth.errors.user,
  user: state.auth.user,
});
export const getUserUpdate = (state: TStore) => ({
  loadingUpdate: state.auth.loading.update,
  errorUpdate: state.auth.errors.update,
});