import { useEffect } from "react";

import { data } from "../../utils/data";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./App.module.css";

function App() {
  useEffect(() => {
    document.title = "Stellar Burgers";
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
