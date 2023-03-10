export const getIngredients = state => state.ingredients;
export const getOrder = state => state.order;
export const getRegistrationData = state => ({
  loading: state.auth.loading.registration,
  error: state.auth.errors.registration,
});
export const getLoginData = state => ({
  loading: state.auth.loading.login,
  error: state.auth.loading.login,
});
