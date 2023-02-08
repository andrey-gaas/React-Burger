import { useState, useEffect } from 'react';

import checkResponse from '../../utils/checkResponse'; 
import { INGREDIENTS_LIST_URL } from '../../constants/api';

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./App.module.css";

function App() {
  const [state, setState] = useState({
    ingredientsList: null,
    loading: false,
    hasError: false,
  });

  useEffect(() => {
    setState(state => ({
      ...state,
      loading: true,
      hasError: false,
    }));

    async function fetchIngredientsList() {
      try {
        let result = await fetch(INGREDIENTS_LIST_URL);
        result = await checkResponse(result);

        setState({
          ingredientsList: result.data,
          loading: false,
          hasError: false,
        });
      } catch(error) {
        setState(state => ({
          ...state,
          loading: false,
          hasError: true,
        }));
      }
    }

    fetchIngredientsList();
  }, []);

  return (
    <>
      <AppHeader />
      {
        state.ingredientsList === null && state.loading &&
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p>
      }
      {
        state.hasError &&
          <p className={`${styles.message} text text_type_main-medium`}>Произошла ошибка :(</p>
      }
      <main className={styles.main}>
        {
          state.ingredientsList &&
            <>
              <BurgerIngredients data={state.ingredientsList} />
              <BurgerConstructor data={state.ingredientsList} />
            </>
        }
      </main>
    </>
  );
}

export default App;
