import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css'

interface IOrderDetailsProps {
  extraClass?: string;
}

function OrderDetails(props: IOrderDetailsProps) {
  const { extraClass } = props;

  return (
    <section className={`${styles.container} ${extraClass}`}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #11111
      </p>

      <h1 className="mt-10 text text_type_main-medium">Black Hole Singularity острый бургер</h1>
      <p className="mt-3 text text_type_main-default text_color_success">
        Выполнен
      </p>

      <div className="mt-15">
        <h2 className="text text_type_main-medium">Состав:</h2>
        <section className={`${styles.compound}`}>
          <article className={`mt-4 ${styles.ingredient}`}>
            <div className={styles['image-container']}>
              <img
                className={styles.image}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt=""
              />
            </div>
            <h1 className="ml-4 mr-4 text text_type_main-default">
              Филе Люминесцентного тетраодонтимформа
            </h1>

            <p className={styles.price}>
              <span className="text text_type_digits-default">480</span> <CurrencyIcon type="primary" />
            </p>
          </article>
        </section>
      </div>

      <div className={`mt-10 ${styles.info}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </p>
        <p className={styles.price}>
          <span className="text text_type_digits-default">480</span> <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
}

export default OrderDetails;
