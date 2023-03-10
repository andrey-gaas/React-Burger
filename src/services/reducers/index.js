import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import orderReducer from './order';
import authReducer from './auth';

export default combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
});
