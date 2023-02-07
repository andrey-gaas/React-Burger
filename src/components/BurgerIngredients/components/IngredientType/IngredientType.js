import { memo } from "react";
import PropTypes from 'prop-types';
import dataType from '../../../../types/data';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientType.module.css";

function IngredientType(props) {
  const { title, elementRef, list } = props;

  return (
    <>
      <h3 className="text text_type_main-medium" ref={elementRef}>
        {title}
      </h3>
      <ul className={`${styles.list} mt-6`}>
        {list.map((item) => (
          <li key={item._id} className={`${styles.card} pl-4 pr-4`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={`${styles.price} mt-1`}>
              <span className="text text_type_digits-default mr-1">
                {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <h4 className={`${styles.title} mt-1 text text_type_main-small`}>
              {item.name}
            </h4>
          </li>
        ))}
      </ul>
    </>
  );
}

IngredientType.propTypes = {
  title: PropTypes.string.isRequired,
  elementRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLHeadingElement),
  }).isRequired,
  list: dataType,
};

export default memo(IngredientType);
