import PropTypes from 'prop-types';

import styles from './IngredientDetails.module.css';

function IngredientDetails(props) {
  const { image, name, calories, proteins, fat, carbohydrates } = props;

  return (
    <section className={styles['content']}>
      <img src={image} alt={name} className={styles['image']} />
      <h3 className="text text_type_main-medium mt-4">{name}</h3>
      <div className={`${styles.nutrients} mt-8`}>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
          <span className="text text_type_main-default text_color_inactive">{calories}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Белки, г</span>
          <span className="text text_type_main-default text_color_inactive">{proteins}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
          <span className="text text_type_main-default text_color_inactive">{fat}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
          <span className="text text_type_main-default text_color_inactive">{carbohydrates}</span>
        </div>
      </div>
    </section>
  );
}

IngredientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

export default IngredientDetails;