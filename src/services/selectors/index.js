export const getIngredients = state => state.ingredients;
export const getOrder = state => state.order;
export const getRegistrationData = state => ({
  loading: state.auth.loading.registration,
  error: state.auth.errors.registration,
  user: state.auth.user,
});
export const getLoginData = state => ({
  loading: state.auth.loading.login,
  error: state.auth.errors.login,
  user: state.auth.user,
});
export const getUserData = state => ({
  loading: state.auth.loading.user,
  error: state.auth.errors.user,
  user: state.auth.user,
});
export const getUserUpdate = state => ({
  loadingUpdate: state.auth.loading.update,
  errorUpdate: state.auth.errors.update,
});