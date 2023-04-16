import { useDispatch } from 'react-redux';
import { IIngredientWithKey } from '../../../../types/ingredient';
import { ingredientsActionCreators } from '../../../../services/actionCreators/ingredients';

import Ingredient from '../Ingredient/Ingredient';

import styles from "./List.module.css";

interface IProps {
  data: IIngredientWithKey[],
  backlight: boolean,
}

function List(props: IProps) {
  const { data, backlight } = props;
  const dispatch = useDispatch();

  const getType = (index: number) => {
    if (index === 0) return 'top';
    else if (index === data.length - 1) return 'bottom';
    return undefined;
  }

  const removeIngredient = (index: number) => {
    dispatch(ingredientsActionCreators.removeIngredient(index));
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {

    if (!dragIndex) return;

    dispatch(ingredientsActionCreators.moveIngredients(dragIndex, hoverIndex));
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

export default List;
