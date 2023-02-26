import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredient } from '../../../../types/data';
import { getIngredients } from '../../../../services/selectors';

import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Ingredient.module.css';

function Ingredient(props) {
  const { handleClick, ingredient } = props;
  const { selectedIngredients } = useSelector(getIngredients);
  
  const currentIngredient = selectedIngredients.filter(item => item._id === ingredient._id);
  
  // eslint-disable-next-line
  const [dragData, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li className={`${styles.card} pl-4 pr-4`} onClick={() => handleClick(ingredient)} ref={dragRef}>
      {
        currentIngredient.length ?
          <Counter count={currentIngredient.length} size="default" extraClass="m-1" />
          : null
      }
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={`${styles.price} mt-1`}>
        <span className="text text_type_digits-default mr-1">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${styles.title} mt-1 text text_type_main-small`}>
        {ingredient.name}
      </h4>
    </li>
  );
}

Ingredient.propTypes = {
  handleClick: PropTypes.func.isRequired,
  ingredient: ingredient.isRequired,
};

export default Ingredient;
