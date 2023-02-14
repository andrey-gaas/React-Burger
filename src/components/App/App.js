import { useState, useEffect } from 'react';

import ConstructorContext from '../../services/ConstructorContext';
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

  const [selectedIngredients, setSelectedIngredients] = useState([
    {
      _id: "60d3b41abdacab0026a733ca",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733cc",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    }
  ]);

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
            <>
              <BurgerIngredients data={ingredientsList.list} />
              <ConstructorContext.Provider value={{ selectedIngredients, setIngredients: setSelectedIngredients }}>
                <BurgerConstructor data={ingredientsList.list} />
              </ConstructorContext.Provider>
            </>
        }
      </main>
    </>
  );
}

export default App;
