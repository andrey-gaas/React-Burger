import useOrders from '../../services/hooks/orders';
import { IUserOrderData } from '../../types/order';

import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';

function Orders() {
  const { order } = useOrders();

  let list: IUserOrderData[] = [];

  if (order.lists.user && order.lists.user.orders) {
    list = [...order.lists.user.orders];
  }

  return (
    <section className={styles.container}>
      {
        list.reverse().map(
          (item, i) =>
            <OrderCard
              key={item._id}
              className={i ? 'mt-4' : ''}
              link={`/profile/orders/${item._id}`}
              status={item.status}
              number={item.number}
              name={item.name}
              date={item.createdAt}
              ingredients={item.ingredients}
            />
        )
      }
    </section>
  );
}

export default Orders;
