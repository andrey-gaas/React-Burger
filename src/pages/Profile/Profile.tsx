import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from '../../utils/cookies';
import AuthApi from '../../API/AuthApi';
import { authActionCreators } from '../../services/actionCreators/auth';

import { Profile, Orders } from '../../components';
import styles from './Profile.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileActive = useMatch('profile');
  const ordersActive = useMatch('profile/orders');

  const handleLogout = async () => {
    const refreshToken = Cookies.getCookie('refresh');

    try {
      const result: any = await AuthApi.logout(refreshToken);

      if (result.success) {
        Cookies.deleteCookie('token');
        Cookies.deleteCookie('refresh');
        dispatch(authActionCreators.logout());
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={handleLogout}
        >
          Выход
        </button>
        <section className="mt-20 text text_type_main-default text_color_inactive">
          {profileActive && <span>В этом разделе вы можете изменить свои персональные данные</span>}
          {ordersActive && <span>В этом разделе вы можете просмотреть свою историю заказов</span>}
        </section>
      </nav>
      <section>
        {profileActive && <Profile />}
        {ordersActive && <Orders />}
      </section>
    </main>
  );
}

export default ProfilePage;
