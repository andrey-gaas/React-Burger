import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/selectors';
import actionCreators from '../../services/actionCreators/ingredients';

import Tabs from "./components/Tabs/Tabs";
import IngredientType from "./components/IngredientType/IngredientType";
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import Modal from "../Modal/Modal";

import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
  const { list, currentIngredient } = useSelector(getIngredients);
  const dispatch = useDispatch();

  const listRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();
  const [ingredientType, setIngredientType] = useState("bun");

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
  
  const handleScroll = ({ target }) => {
    const titles = target.querySelectorAll('h3');

    let element = {
      node: null,
      top: null,
    };

    titles.forEach(item => {
      const top = Math.abs(item.getBoundingClientRect().top - target.getBoundingClientRect().top);

      if (element.node === null) {
        element.node = item;
        element.top = top;
      } else if (top < element.top) {
        element.node = item;
        element.top = top;
      }
    });
    
    if (ingredientType !== element.node.dataset.type) {
      setIngredientType(element.node.dataset.type);
    }
  };

  const openIngredient = ingredient => dispatch(actionCreators.setCurrentIngredient(ingredient));
  const closeModal = () => dispatch(actionCreators.removeCurrentIngredient());

  return (
    <>
      <section>
        <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>

        <Tabs ingredientType={ingredientType} setIngredientType={handleClick} />

        <section
          ref={listRef}
          onScroll={handleScroll}
          className={`${styles["ingredients-container"]} mt-10`}
        >
          <div>
            <IngredientType
              title="Булки"
              elementRef={bunsRef}
              list={buns}
              elementClick={openIngredient}
              type="bun"
            />
          </div>

          <div className="mt-10">
            <IngredientType
              title="Соусы"
              elementRef={saucesRef}
              list={sauces}
              elementClick={openIngredient}
              type="sauce"
            />
          </div>

          <div className="mt-10">
            <IngredientType
              title="Начинка"
              elementRef={mainRef}
              list={main}
              elementClick={openIngredient}
              type="main"
            />
          </div>
        </section>
      </section>
      { currentIngredient && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails data={currentIngredient} />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredients;
