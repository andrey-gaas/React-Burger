import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import useIngredients from '../../services/hooks/ingredients';

import { BurgerConstructor, BurgerIngredients } from '../../components';

import styles from "./Home.module.css";

function HomePage() {
  const { list, loading, hasError } = useIngredients();

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
