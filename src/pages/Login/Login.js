import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import useForm from '../../services/hooks/useForm';
import useAuth from '../../services/hooks/auth';
import * as EmailValidator from 'email-validator';
import { getLoginData } from '../../services/selectors';
import fetchLogin from '../../services/thunks/fetchLogin';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Login.module.css';

function LoginPage() {
  const { loading, error } = useSelector(getLoginData);
  const dispatch = useDispatch();
  const { values, handleChange, errors, setErrors } = useForm(
    { email: '', password: '' },
    { email: '', password: '' },
  );
  const { user } = useAuth();

  const handleSubmit = event => {
    event.preventDefault();
    if (!values.email) {
      return setErrors({ ...errors, email: 'Введите Email' });
    }

    if (!EmailValidator.validate(values.email)) {
      return setErrors({ ...errors, email: 'Введите корректный Email' });
    }

    if (!values.password) {
      return setErrors({ ...errors, password: 'Введите пароль' });
    }

    if (values.password.length < 6 || values.password.length > 16) {
      return setErrors({ ...errors, password: 'Пароль должен содержать от 6 до 16 символов' });
    }

    dispatch(fetchLogin(values.email, values.password));
  };

  if (user !== null) {
    return <Navigate to="/" />
  }

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
      {
        error && (
          <p className={`text text_type_main-default text_color_error mt-10`}>
            Неверный логин или пароль
          </p>
        )
      }
      <form
        className={`mt-6 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <EmailInput
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          extraClass="mt-6"
          name="email"
          error={!!errors.email}
          errorText={errors.email}
        />
        <PasswordInput
          value={values.password}
          onChange={handleChange}
          placeholder="Пароль"
          extraClass="mt-6"
          name="password"
          error={!!errors.password}
          errorText={errors.password}
        />
        <Button
          extraClass={`mt-6 ${styles.button}`}
          htmlType="submit"
          disabled={loading}
        >
          Вход
          {
            loading && (
            <div className={`${styles['loader-container']} ml-2`}>
              <Loader />
            </div>
          )}
        </Button>
      </form>
      <div className="mt-20 text text_type_main-default text_color_inactive">
        <span>
          Вы — новый пользователь?
        </span>
        <Link to="/registration" className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
      <div className="mt-4 text text_type_main-default text_color_inactive">
        <span>
          Забыли пароль?
        </span>
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </div>
    </main>
  );
}

export default LoginPage;
