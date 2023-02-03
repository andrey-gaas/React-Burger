import { useState, useRef, useMemo } from "react";

import Tabs from "./components/Tabs/Tabs";
import IngredientType from "./components/IngredientType/IngredientType";

import styles from "./BurgerIngredients.module.css";

function BurgerIngredients(props) {
  const { data } = props;

  const listRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();
  const [ingredientType, setIngredientType] = useState("bun");

  const buns = useMemo(() => data.filter((item) => item.type === "bun"), [data]);
  const sauces = useMemo(() => data.filter((item) => item.type === "sauce"), [data]);
  const main = useMemo(() => data.filter((item) => item.type === "main"), [data]);

  const handleClick = (value) => {
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
  };

  return (
    <section>
      <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>

      <Tabs ingredientType={ingredientType} setIngredientType={handleClick} />

      <section
        ref={listRef}
        className={`${styles["ingredients-container"]} mt-10`}
      >
        <div>
          <IngredientType title="Булки" elementRef={bunsRef} list={buns} />
        </div>

        <div className="mt-10">
          <IngredientType title="Соусы" elementRef={saucesRef} list={sauces} />
        </div>

        <div className="mt-10">
          <IngredientType title="Начинка" elementRef={mainRef} list={main} />
        </div>
      </section>
    </section>
  );
}

export default BurgerIngredients;
