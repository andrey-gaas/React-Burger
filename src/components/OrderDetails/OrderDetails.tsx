import { Navigate, useMatch, useParams } from 'react-router-dom';
import useIngredients from '../../services/hooks/ingredients';
import useOrders from '../../services/hooks/orders';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css'
import { IWSOrderData } from '../../types/order';
import { IIngredient } from '../../types/ingredient';

interface IOrderDetailsProps {
  extraClass?: string;
}

function OrderDetails(props: IOrderDetailsProps) {
  const { extraClass } = props;
  const { orderId } = useParams();

  const feedMatch = useMatch(`feed/${orderId}`);
  const profileMatch = useMatch(`profile/orders/${orderId}`);
  const { list: ingredientsList } = useIngredients();
  const { order: storeOrders } = useOrders();
  let order: IWSOrderData | undefined;
  let ingredients: IIngredient[] = [];
  let price = 0;
  let status: 'Создан' | 'Готовится' | 'Выполнен' = 'Создан';

  if (feedMatch && (storeOrders.lists.general && storeOrders.lists.general.orders)) {
    order = storeOrders.lists.general.orders.find(item => item._id === orderId);
  }

  if (profileMatch && (storeOrders.lists.user && storeOrders.lists.user.orders)) {
    order = storeOrders.lists.user.orders.find(item => item._id === orderId);
  }

  if (order && ingredientsList) {
    order.ingredients.forEach(ingredientId => {
      const ingredient = ingredientsList.find(item => item._id === ingredientId);

      if (ingredient) ingredients.push(ingredient);
    });
  }

  // Определение статуса и цены
  if (order && ingredients) {
    switch (order.status) {
      case 'done': status = 'Выполнен'; break;
      case 'pending': status = 'Готовится'; break;
      case 'created': status = 'Создан'; break;
    }

    price = ingredients.reduce((price, ingredient) => price + ingredient.price, 0);
  }

  // Ждем пока загрузятся списки
  if (!storeOrders.lists.user && storeOrders.lists.general) {
    return (
      <section className={styles.container}>
        Загрузка...
      </section>
    );
  }

  if (storeOrders.lists.user && storeOrders.lists.general && !order) {
    return <Navigate to="not-found" />
  }

  return (
    order ?
      <section className={`${styles.container} ${extraClass}`}>
        <p className={`text text_type_digits-default ${styles.number}`}>
          #{order.number}
        </p>

        <h1 className="mt-10 text text_type_main-medium">{order.name}</h1>
        <p className="mt-3 text text_type_main-default text_color_success">
          {status}
        </p>

        <div className="mt-15">
          <h2 className="text text_type_main-medium">Состав:</h2>
          <section className={`${styles.compound}`}>
            {
              ingredients.map(
                (item, i) =>
                  <article key={i} className={`mt-4 ${styles.ingredient}`}>
                    <div className={styles['image-container']}>
                      <img
                        className={styles.image}
                        src={item.image_mobile}
                        alt={item.name}
                      />
                    </div>
                    <h1 className="ml-4 mr-4 text text_type_main-default">
                      {item.name}
                    </h1>

                    <p className={styles.price}>
                      <span className="text text_type_digits-default">{item.price}</span> <CurrencyIcon type="primary" />
                    </p>
                  </article>
              )
            }
          </section>
        </div>

        <div className={`mt-10 ${styles.info}`}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default">{price}</span> <CurrencyIcon type="primary" />
          </p>
        </div>
      </section>
      : <p>Загрузка...</p>
  );
}

export default OrderDetails;
