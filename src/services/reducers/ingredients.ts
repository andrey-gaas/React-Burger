import * as actions from '../actions/ingredients';
import * as orderActions from '../actions/order';
import swap from '../../utils/swap';
import { IIngredients } from '../../types/ingredient';
import { TIngredientsActionCreators } from '../actionCreators/ingredients';
import { TOrderActionCreators } from '../actionCreators/order';

const initialState: IIngredients = {
  list: [],
  loading: false,
  hasError: false,
  selectedIngredients: [],
};

function ingredientsReducer(state = initialState, action: TIngredientsActionCreators | TOrderActionCreators): IIngredients {
  switch (action.type) {
    case actions.FETCH_INGREDIENTS_LIST:
      return { ...state, hasError: false, loading: true };
    case actions.FETCH_INGREDIENTS_LIST_SUCCESS:
      return { ...state, hasError: false, loading: false, list: [...action.data] };
    case actions.FETCH_INGREDIENTS_LIST_FAIL:
      return { ...state, hasError: true, loading: false };
    case actions.ADD_INGREDIENT:
      return { ...state, selectedIngredients: [...state.selectedIngredients, action.ingredient] };
    case actions.REMOVE_INGREDIENT:
      return { ...state, selectedIngredients: state.selectedIngredients.filter((item, i) => i !== action.index) };
    case actions.REMOVE_BUN:
      return { ...state, selectedIngredients: state.selectedIngredients.filter(item => item.type !== 'bun') };

    case actions.MOVE_INGREDIENTS:
      return { ...state, selectedIngredients: [...swap(state.selectedIngredients, action.target, action.movable)] };

    case orderActions.FETCH_ORDER_SUCCESS:
      return { ...state, selectedIngredients: [] };

    default:
      return state;
  }
}

export default ingredientsReducer;
