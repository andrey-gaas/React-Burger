import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import ordersReducer from './orders';
import authReducer from './auth';

export default combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  auth: authReducer,
});
