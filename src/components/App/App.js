import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchIngredientsList from '../../services/thunks/fetchIngredients';
import { getIngredients } from '../../services/selectors';

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./App.module.css";

function App() {
  const { list, loading, hasError } = useSelector(getIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {
        list === null && loading &&
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p>
      }
      {
        hasError &&
          <p className={`${styles.message} text text_type_main-medium`}>Произошла ошибка :(</p>
      }
      <main className={styles.main}>
        {
          list &&
            <>
              <BurgerIngredients />
              <BurgerConstructor data={list} />
            </>
        }
      </main>
    </>
  );
}

export default App;
