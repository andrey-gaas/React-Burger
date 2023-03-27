import { useState, useRef, useMemo, useCallback } from "react";
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

import Tabs from "./components/Tabs/Tabs";
import Ingredient from "./components/Ingredient/Ingredient";

import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
  const { list } = useSelector(getIngredients);

  const listRef = useRef<HTMLElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const [ingredientType, setIngredientType] = useState("bun");

  const buns = useMemo(() => list.filter((item) => item.type === "bun"), [list]);
  const sauces = useMemo(() => list.filter((item) => item.type === "sauce"), [list]);
  const main = useMemo(() => list.filter((item) => item.type === "main"), [list]);

  const handleClick = useCallback((value: string) => {
    setIngredientType(value);
    let top: number = 0;

    if (!bunsRef.current || !listRef.current || !saucesRef.current || !listRef.current || !mainRef.current) {
      return;
    }

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

  const handleScroll = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    const titles = currentTarget.querySelectorAll('h3');

    let element: { node: null | HTMLHeadingElement; top: null | number } = {
      node: null,
      top: null,
    };

    titles.forEach(item => {
      const top = Math.abs(item.getBoundingClientRect().top - currentTarget.getBoundingClientRect().top);

      if (element.node === null) {
        element.node = item;
        element.top = top;
      } else if (element.top && top < element.top) {
        element.node = item;
        element.top = top;
      }
    });

    if (element.node?.dataset.type && ingredientType !== element.node?.dataset.type) {
      setIngredientType(element.node.dataset.type);
    }
  };

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
            <h3 className="text text_type_main-medium" ref={bunsRef} data-type="bun">
              Булки
            </h3>
            <ul className={`${styles.list} mt-6`}>
              {buns.map((item) => (
                <Ingredient
                  key={item._id}
                  ingredient={item}
                />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="text text_type_main-medium" ref={saucesRef} data-type="sauce">
              Соусы
            </h3>
            <ul className={`${styles.list} mt-6`}>
              {sauces.map((item) => (
                <Ingredient
                  key={item._id}
                  ingredient={item}
                />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="text text_type_main-medium" ref={mainRef} data-type="main">
              Начинка
            </h3>
            <ul className={`${styles.list} mt-6`}>
              {main.map((item) => (
                <Ingredient
                  key={item._id}
                  ingredient={item}
                />
              ))}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
}

export default BurgerIngredients;
