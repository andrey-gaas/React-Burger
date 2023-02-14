import { useState, useEffect } from 'react';

import ConstructorContext from '../../services/ConstructorContext';
import checkResponse from '../../utils/checkResponse'; 
import { INGREDIENTS_LIST_URL } from '../../constants/api';

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
      _id: "60666c42cc7b410027a1a9b5",
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
      _id: "60666c42cc7b410027a1a9b7",
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
      _id: "60666c42cc7b410027a1a9b1",
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
        let result = await fetch(INGREDIENTS_LIST_URL);
        result = await checkResponse(result);

        setIngredientsList({
          list: result.data,
          loading: false,
          hasError: false,
        });

        console.log(result.data);
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
