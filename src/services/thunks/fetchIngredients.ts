import { AppDispatch } from '../../types/store';
import IngredientsApi from '../../API/IngredientsApi';
import { ingredientsActionCreators } from '../actionCreators/ingredients';

function fetchIngredientsListThunk() {
  return async function (dispatch: AppDispatch) {
    dispatch(ingredientsActionCreators.fetchIngredientsList());

    try {
      const result: any = await IngredientsApi.fetchIngredientsList();

      dispatch(ingredientsActionCreators.fetchIngredientsListSuccess(result.data));
    } catch (error) {
      dispatch(ingredientsActionCreators.fetchIngredientsListFail());
    }
  }
}

export default fetchIngredientsListThunk;
