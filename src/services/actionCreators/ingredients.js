import * as actions from '../actions/ingredients';

const ingredientsActionCreators = {
  fetchIngredientsList: () => ({ type: actions.FETCH_INGREDIENTS_LIST }),
  fetchIngredientsListSuccess: (data) => ({ type: actions.FETCH_INGREDIENTS_LIST_SUCCESS, data }),
  fetchIngredientsListFail: () => ({ tyoe: actions.FETCH_INGREDIENTS_LIST_FAIL }),
};

export default ingredientsActionCreators;
