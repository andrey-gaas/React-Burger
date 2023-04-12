import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderCard.module.css';

interface IOrderCardProps {
  className?: string;
}

function OrderCard(props: IOrderCardProps) {
  const { className } = props;

  return (
    <article className={`mt-4 p-6 ${styles.container} ${className}`}>
      <div className={styles.info}>
        <span className="text text_type_digits-default">#034535</span>
        <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
      </div>
      <h1 className="mt-6 text text_type_main-medium">Death Star Starship Main бургер</h1>
      <div className={`mt-6 ${styles['ingredient-list']}`}>
        <div className={styles.ingredient}>
          <img
            className={styles.image}
            src="https://code.s3.yandex.net/react/code/bun-01.png"
            alt=""
          />
        </div>
        <div className={styles.ingredient}>
          <img
            className={styles.image}
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt=""
          />
        </div>
        <div className={styles.ingredient}>
          <img
            className={styles.image}
            src="https://code.s3.yandex.net/react/code/bun-02.png"
            alt=""
          />
        </div>
        <div className={styles['price-container']}>
          <span className="text text_type_digits-default">480</span> <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
