import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import useIngredients from '../../services/hooks/ingredients';

import styles from './OrderCard.module.css';
import { IIngredient } from '../../types/ingredient';

interface IOrderCardProps {
  className?: string;
  status?: 'Создан' | 'Готовится' | 'Выполнен';
  link: string;
  number: number;
  name: string;
  date: string;
  ingredients: string[];
}

function OrderCard(props: IOrderCardProps) {
  const { className, status, link, number, name, date, ingredients } = props;
  const location = useLocation();
  const { list } = useIngredients();
  let ingredientsList: IIngredient[] = [];

  if (ingredients && list) {
    ingredients.forEach((ingredientItem) => {
      const ingredient = list.find(item => item._id === ingredientItem);

      if (ingredient) {
        ingredientsList.push(ingredient);
      }
    });
  }

  const price: number = ingredientsList.reduce((value, { price }) => value + price, 0);

  return (
    <Link
      state={{ background: location }}
      to={link}
      className={`${styles.link} mt-4`}
    >
      <article className={`p-6 ${styles.container} ${className}`}>
        <div className={styles.info}>
          <span className="text text_type_digits-default">{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(date)} />
          </span>
        </div>
        <h1 className="mt-6 text text_type_main-medium">{name}</h1>
        {
          status &&
          <p className={`mt-2 text text_type_main-default ${status === 'Выполнен' && 'text_color_success'}`}>{status}</p>
        }
        <div className={`mt-6 ${styles['ingredient-list']}`}>
          {
            ingredientsList.map(
              (item, i) =>
                <div className={styles.ingredient} key={i}>
                  <img
                    className={styles.image}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                </div>
            )
          }
          <div className={styles['price-container']}>
            <span className="text text_type_digits-default">{price}</span> <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default memo(OrderCard);
