import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getIngredients } from '../selectors';
import fetchIngredients from '../thunks/fetchIngredients';
import { IIngredient } from '../../types/ingredient';

interface IUseIngredientsResult {
  list: IIngredient[] | null;
  loading: boolean;
  hasError: boolean;
};

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

function useIngredients(): IUseIngredientsResult {
  const dispatch: AppDispatch = useDispatch();
  const { list, loading, hasError } = useSelector(getIngredients);

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, list]);

  return {
    list,
    loading,
    hasError,
  };
};

export default useIngredients;
