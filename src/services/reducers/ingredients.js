import * as actions from '../actions/ingredients';

const initialState = {
  list: null,
  loading: false,
  hasError: false,
  selectedIngredients: [],
  currentIngredient: null,
};

function ingredientsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.FETCH_INGREDIENTS_LIST:
      return { ...state, hasError: false, loading: true };
    case actions.FETCH_INGREDIENTS_LIST_SUCCESS:
      return { ...state, hasError: false, loading: false, list: [...action.data] };
    case actions.FETCH_INGREDIENTS_LIST_FAIL:
      return { ...state, hasError: true, loading: false };

    case actions.SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.ingredient };
    case actions.REMOVE_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };

    default:
      return state;
  }
}

export default ingredientsReducer;
