import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { convertedIngredient } from '../../../../types/data';
import actionCreators from '../../../../services/actionCreators/ingredients';

import Ingredient from '../Ingredient/Ingredient';

import styles from "./List.module.css";

function List(props) {
  const { data, backlight } = props;
  const dispatch = useDispatch();

  const getType = (index) => {
    if (index === 0) return 'top';
    else if (index === data.length - 1) return 'bottom';
    return undefined;
  }

  const removeIngredient = index => {
    dispatch(actionCreators.removeIngredient(index));
  };

  const moveIngredient = (dragIndex, hoverIndex) => {
    if (!dragIndex) return;

    dispatch(actionCreators.moveIngredients(dragIndex, hoverIndex));
  };
  
  return (
    <ul className={`${styles.list} ${backlight && styles.backlight}`}>
      {
        data.map((item, i) => (
          <Ingredient
            key={item.key}
            ingredient={item}
            type={getType(i)}
            remove={() => removeIngredient(i)}
            move={moveIngredient}
            index={i}
          />
        ))
      }
    </ul>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(convertedIngredient).isRequired,
  backlight: PropTypes.bool.isRequired,
};

export default List;
