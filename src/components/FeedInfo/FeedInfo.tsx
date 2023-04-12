import styles from './FeedInfo.module.css';

function FeedInfo() {
  return (
    <section>
      <section className={styles.statuses}>
        <article>
          <h1 className="text text_type_main-medium">Готовы:</h1>
          <div className={`mt-6 ${styles.list}`}>
            <span className="text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
            <span className="mt-2 text text_type_digits-default text_color_success">034533</span>
          </div>
        </article>
        <article>
          <h1 className="text text_type_main-medium">В работе:</h1>
          <div className={`mt-6 ${styles.list}`}>
            <span className="text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
            <span className="mt-2 text text_type_digits-default">034533</span>
          </div>
        </article>
      </section>
      <section className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <span className={`text text_type_digits-large ${styles.count}`}>28752</span>
      </section>
      <section className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className={`text text_type_digits-large ${styles.count}`}>138</span>
      </section>
    </section>
  );
}

export default FeedInfo;
