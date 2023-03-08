import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import fetchIngredientsList from '../../services/thunks/fetchIngredients';
import { getIngredients } from '../../services/selectors';

import { BurgerConstructor, BurgerIngredients } from '../../components';

import styles from "./Home.module.css";

function HomePage() {
  const { list, loading, hasError } = useSelector(getIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, [dispatch]);

  return (
    <>
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
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor data={list} />
            </DndProvider>
        }
      </main>
    </>
  );
}

export default HomePage;
