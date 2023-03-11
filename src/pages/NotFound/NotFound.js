import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h2 className="mt-20 text text_type_main-large">
        🤷‍♂️Страница не найдена🤷‍♀️
      </h2>
      <Link to="/" className={`mt-20 text text_type_main-default ${styles.link}`}>
        Перейти на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
