import { Link, Routes, Route, useMatch } from 'react-router-dom';

import { Profile } from '../../components';
import styles from './Profile.module.css';

function ProfilePage() {
  const profileActive = useMatch('profile');
  const ordersActive = useMatch('profile/orders');

  return (
    <main className={`mt-30 ${styles.container}`}>
      <nav className={styles.nav}>
        <Link to="/profile" className="mt-6">
          <button
            className={`text text_type_main-medium ${styles.button} ${profileActive ? styles.active : styles.inactive}`}
          >
            Профиль
          </button>
        </Link>
        <Link to="/profile/orders" className="mt-6">
          <button
            className={`text text_type_main-medium ${styles.button} ${ordersActive ? styles.active : styles.inactive}`}
          >
            История заказов
          </button>
        </Link>
        <button
          className={`mt-6 text text_type_main-medium ${styles.button} ${styles.inactive}`}
        >
          Выход
        </button>
        <section className="mt-20 text text_type_main-default text_color_inactive">
          {profileActive && <span>В этом разделе вы можете изменить свои персональные данные</span>}
          {ordersActive && <span>Этот раздел еще не разработан</span>}
        </section>
      </nav>
      <section>
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      </section>
    </main>
  );
}

export default ProfilePage;
