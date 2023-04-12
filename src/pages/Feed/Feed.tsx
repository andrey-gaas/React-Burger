import { OrderCard, FeedInfo } from '../../components';
import styles from './Feed.module.css';

function Feed() {
  return (
    <main className={styles.container}>
      <h1 className="mt-10 text text text_type_main-large">Лента заказов</h1>
      <div className={`mt-5 ${styles.grid}`}>
        <section>
          <section className={`mt-5 ${styles.ingredients}`}>
            {
              [0, 1, 2, 3].map((item, i) => (
                <OrderCard key={item} className={i ? 'mt-4' : ''} />
              ))
            }
          </section>
        </section>
        <FeedInfo />
      </div>
    </main>
  );
}

export default Feed;
