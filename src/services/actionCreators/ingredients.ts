import * as actions from '../actions/ingredients';
import { IIngredient } from '../../types/ingredient';

interface IIngredientsActionSuccess {
  readonly type: typeof actions.FETCH_INGREDIENTS_LIST_SUCCESS;
  readonly data: IIngredient[];
}

interface IIngredientsActionRemove {
  readonly type: typeof actions.REMOVE_INGREDIENT;
  readonly index: number;
}

interface IIngredientsActionAdd {
  readonly type: typeof actions.ADD_INGREDIENT;
  readonly ingredient: IIngredient;
}

interface IIngredientsActionMove {
  readonly type: typeof actions.MOVE_INGREDIENTS;
  readonly target: number;
  readonly movable: number;
}

interface IIngredientsActions {
  readonly type: typeof actions.FETCH_INGREDIENTS_LIST | typeof actions.FETCH_INGREDIENTS_LIST_FAIL | typeof actions.REMOVE_BUN
}

export type TIngredientsActionCreators = IIngredientsActionSuccess | IIngredientsActionRemove | IIngredientsActionAdd | IIngredientsActionMove | IIngredientsActions;

export const ingredientsActionCreators = {
  fetchIngredientsList: (): TIngredientsActionCreators => ({ type: actions.FETCH_INGREDIENTS_LIST }),
  fetchIngredientsListSuccess: (data: IIngredient[]): TIngredientsActionCreators => ({ type: actions.FETCH_INGREDIENTS_LIST_SUCCESS, data }),
  fetchIngredientsListFail: (): TIngredientsActionCreators => ({ type: actions.FETCH_INGREDIENTS_LIST_FAIL }),

  addIngredient: (ingredient: IIngredient): TIngredientsActionCreators => ({ type: actions.ADD_INGREDIENT, ingredient }),
  removeIngredient: (index: number): TIngredientsActionCreators => ({ type: actions.REMOVE_INGREDIENT, index }),
  removeBun: () => ({ type: actions.REMOVE_BUN }),
  moveIngredients: (target: number, movable: number): TIngredientsActionCreators => ({ type: actions.MOVE_INGREDIENTS, target, movable }),
};

