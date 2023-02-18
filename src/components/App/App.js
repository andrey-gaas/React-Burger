import { useState, useEffect } from 'react';

import ConstructorContext from '../../services/ConstructorContext';
import BurgerContext from '../../services/BurgerContext';
import IngredientsApi from '../../API/IngredientsApi';

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./App.module.css";

function App() {
  const [ingredientsList, setIngredientsList] = useState({
    list: null,
    loading: false,
    hasError: false,
  });

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    setIngredientsList(state => ({
      ...state,
      loading: true,
      hasError: false,
    }));

    async function fetchIngredientsList() {
      try {
        const result = await IngredientsApi.fetchIngredientsList();
        
        setIngredientsList({
          list: result.data,
          loading: false,
          hasError: false,
        });

        setSelectedIngredients([
          result.data[1],
          result.data[3],
          result.data[8],
          result.data[14],
        ]);
      } catch(error) {
        setIngredientsList(state => ({
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
        ingredientsList.list === null && ingredientsList.loading &&
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p>
      }
      {
        ingredientsList.hasError &&
          <p className={`${styles.message} text text_type_main-medium`}>Произошла ошибка :(</p>
      }
      <main className={styles.main}>
        {
          ingredientsList.list &&
            <BurgerContext.Provider value={{ ingredientsList: ingredientsList.list }}>
              <BurgerIngredients />
              <ConstructorContext.Provider value={{ selectedIngredients, setIngredients: setSelectedIngredients }}>
                <BurgerConstructor data={ingredientsList.list} />
              </ConstructorContext.Provider>
            </BurgerContext.Provider>
        }
      </main>
    </>
  );
}

export default App;
