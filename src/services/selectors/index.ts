import { IIngredients } from '../../types/ingredient';
import { IAuth } from '../../types/auth';
import { IOrderData } from '../../types/order';

interface IStore {
  ingredients: IIngredients,
  order: IOrderData,
  auth: IAuth,
}

export const getIngredients = (state: IStore) => state.ingredients;
export const getOrder = (state: IStore) => state.order;
export const getRegistrationData = (state: IStore) => ({
  loading: state.auth.loading.registration,
  error: state.auth.errors.registration,
  user: state.auth.user,
});
export const getLoginData = (state: IStore) => ({
  loading: state.auth.loading.login,
  error: state.auth.errors.login,
  user: state.auth.user,
});
export const getUserData = (state: IStore) => ({
  loading: state.auth.loading.user,
  error: state.auth.errors.user,
  user: state.auth.user,
});
export const getUserUpdate = (state: IStore) => ({
  loadingUpdate: state.auth.loading.update,
  errorUpdate: state.auth.errors.update,
});