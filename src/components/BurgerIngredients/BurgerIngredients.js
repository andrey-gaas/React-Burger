import { useState, useRef, useMemo, useCallback } from "react";
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

import Tabs from "./components/Tabs/Tabs";
import IngredientType from "./components/IngredientType/IngredientType";
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import Modal from "../Modal/Modal";

import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
  const { list } = useSelector(getIngredients);

  const listRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();
  const [ingredientType, setIngredientType] = useState("bun");
  const [modalData, setModalData] = useState(null);

  const buns = useMemo(() => list.filter((item) => item.type === "bun"), [list]);
  const sauces = useMemo(() => list.filter((item) => item.type === "sauce"), [list]);
  const main = useMemo(() => list.filter((item) => item.type === "main"), [list]);

  const handleClick = useCallback((value) => {
    setIngredientType(value);
    let top = 0;

    if (value === "bun") {
      top = bunsRef.current.offsetTop - listRef.current.offsetTop;
    } else if (value === "sauce") {
      top = saucesRef.current.offsetTop - listRef.current.offsetTop;
    } else {
      top = mainRef.current.offsetTop - listRef.current.offsetTop;
    }

    listRef.current.scrollTo({
      top,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <section>
        <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>

        <Tabs ingredientType={ingredientType} setIngredientType={handleClick} />

        <section
          ref={listRef}
          className={`${styles["ingredients-container"]} mt-10`}
        >
          <div>
            <IngredientType title="Булки" elementRef={bunsRef} list={buns} elementClick={setModalData} />
          </div>

          <div className="mt-10">
            <IngredientType title="Соусы" elementRef={saucesRef} list={sauces} elementClick={setModalData} />
          </div>

          <div className="mt-10">
            <IngredientType title="Начинка" elementRef={mainRef} list={main} elementClick={setModalData} />
          </div>
        </section>
      </section>
      { modalData && (
        <Modal onClose={() => setModalData(false)} title="Детали ингредиента">
          <IngredientDetails data={modalData} />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
