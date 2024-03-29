import { memo } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Tabs.module.css";

interface IProps {
  ingredientType: string,
  setIngredientType: (value: string) => void,
}

function Tabs(props: IProps) {
  const { ingredientType, setIngredientType } = props;

  return (
    <div className={`${styles["tabs-container"]} mt-5`}>
      <Tab
        value="bun"
        active={ingredientType === "bun"}
        onClick={setIngredientType}
      >
        Булочка
      </Tab>
      <Tab
        value="sauce"
        active={ingredientType === "sauce"}
        onClick={setIngredientType}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={ingredientType === "main"}
        onClick={setIngredientType}
      >
        Начинки
      </Tab>
    </div>
  );
}

export default memo(Tabs);
