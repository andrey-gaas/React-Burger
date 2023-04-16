import { memo } from 'react';
import styles from './FeedInfo.module.css';

interface IFeedInfoProps {
  list: {
    _id: string;
    status: "done" | "pending";
    name: string;
    number: number;
    createdAt: string;
    ingredients: string[];
  }[];
  total: number;
  totalToday: number;
}

function FeedInfo(props: IFeedInfoProps) {
  const { list, total, totalToday } = props;

  const doneList = list.filter((item) => item.status === 'done').slice(0, 20);

  const pendingList = list.filter((item) => item.status === 'pending').slice(0, 20);

  return (
    <section>
      <section className={styles.statuses}>
        <article>
          <h1 className="text text_type_main-medium">Готовы:</h1>
          <div className={`mt-6 ${styles.list}`}>
            <div>
              {
                doneList.slice(0, 10).map(
                  (item) => <span key={item.number} className="text text_type_digits-default text_color_success">{item.number}</span>
                )
              }
            </div>
            {
              doneList.length > 10 &&
              <div>
                {
                  doneList.slice(10, 20).map(
                    (item) => <span key={item.number} className="text text_type_digits-default text_color_success">{item.number}</span>
                  )
                }
              </div>
            }
          </div>
        </article>
        <article>
          <h1 className="text text_type_main-medium">В работе:</h1>
          <div className={`mt-6 ${styles.list}`}>
            <div>
              {
                pendingList.slice(0, 10).map(
                  (item) => <span key={item.number} className="text text_type_digits-default">{item.number}</span>
                )
              }
            </div>
            {
              pendingList.length > 10 &&
              <div>
                {
                  pendingList.slice(10, 20).map(
                    (item) => <span key={item.number} className="text text_type_digits-default">{item.number}</span>
                  )
                }
              </div>
            }
          </div>
        </article>
      </section>
      <section className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <span className={`text text_type_digits-large ${styles.count}`}>{total}</span>
      </section>
      <section className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className={`text text_type_digits-large ${styles.count}`}>{totalToday}</span>
      </section>
    </section>
  );
}

export default memo(FeedInfo);
