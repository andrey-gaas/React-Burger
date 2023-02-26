import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import orderReducer from './order';

export default combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
});
