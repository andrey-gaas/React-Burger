import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';

function Orders() {
  return (
    <section className={styles.container}>
      <OrderCard link={'/profile/orders/1'} status="Выполнен" />
      <OrderCard link={'/profile/orders/1'} status="Готовится" />
      <OrderCard link={'/profile/orders/1'} status="Создан" />
    </section>
  );
}

export default Orders;
