import IngredientsApi from '../../API/IngredientsApi';
import actions from '../actionCreators/ingredients';

function fetchIngredientsListThunk() {
  return async function(dispatch) {
    dispatch(actions.fetchIngredientsList());

    try {
      const result = await IngredientsApi.fetchIngredientsList();
      dispatch(actions.fetchIngredientsListSuccess(result.data));
    } catch(error) {
      dispatch(actions.fetchIngredientsListFail());
    }
  }
}

export default fetchIngredientsListThunk;
