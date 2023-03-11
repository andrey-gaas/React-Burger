import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../selectors';
import fetchIngredients from '../thunks/fetchIngredients';

function useIngredients() {
  const dispatch = useDispatch();
  const { list, loading, hasError } = useSelector(getIngredients);

  useEffect(() => {
    if (!list) {
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
