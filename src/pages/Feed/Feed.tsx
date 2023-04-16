import useOrders from '../../services/hooks/orders';

import { OrderCard, FeedInfo } from '../../components';
import styles from './Feed.module.css';

function Feed() {
  const { order } = useOrders();

  let list;
  let total = 0;
  let totalToday = 0;

  if (order.lists.general) {
    list = order.lists.general.orders;
    total = order.lists.general.total;
    totalToday = order.lists.general.totalToday;
  }

  return (
    <main className={styles.container}>
      <h1 className="mt-10 text text text_type_main-large">Лента заказов</h1>
      <div className={`mt-5 ${styles.grid}`}>
        <section>
          <section className={`mt-5 ${styles.ingredients}`}>
            {
              order.lists.general && order.lists.general.orders.map((item, i) => (
                <OrderCard
                  key={item._id}
                  className={i ? 'mt-4' : ''}
                  link={`/feed/${item._id}`}
                  number={item.number}
                  name={item.name}
                  date={item.createdAt}
                  ingredients={item.ingredients}
                />
              ))
            }
          </section>
        </section>
        {
          list && <FeedInfo list={list} total={total} totalToday={totalToday} />
        }

      </div>
    </main>
  );
}

export default Feed;
