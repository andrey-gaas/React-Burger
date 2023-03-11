import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useIngredients from '../../services/hooks/ingredients';

import styles from './IngredientDetails.module.css';

function IngredientDetails(props) {
  const { extraClass } = props;

  const { ingredientId } = useParams();
  const { list } = useIngredients();

  const ingredient = list.find(ingredient => ingredient._id === ingredientId);

  return (
    <section className={`${styles['content']} ${extraClass}`}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles['image']} />
      <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
      <div className={`${styles.nutrients} mt-8`}>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
          <span className="text text_type_main-default text_color_inactive">{ingredient.calories}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Белки, г</span>
          <span className="text text_type_main-default text_color_inactive">{ingredient.proteins}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
          <span className="text text_type_main-default text_color_inactive">{ingredient.fat}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
          <span className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</span>
        </div>
      </div>
    </section>
  );
}

IngredientDetails.propTypes = {
  extraClass: PropTypes.string,
};

export default IngredientDetails;