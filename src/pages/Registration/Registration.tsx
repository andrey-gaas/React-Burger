import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useForm from '../../services/hooks/useForm';
import useAuth from '../../services/hooks/auth';
import * as EmailValidator from 'email-validator';
import { getRegistrationData } from '../../services/selectors';
import registrationThunk from '../../services/thunks/fetchRegistration';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Registration.module.css';

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

function RegistrationPage() {
  const { loading, error } = useSelector(getRegistrationData);
  const dispatch: AppDispatch = useDispatch();
  const { values, handleChange, errors, setErrors } = useForm(
    { name: '', email: '', password: '' },
    { name: '', email: '', password: '' },
  );
  const { user } = useAuth();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!values.name) {
      return setErrors({ ...errors, name: 'Введите имя' });
    }

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

    dispatch(registrationThunk(values.name, values.email, values.password));
  }

  if (user !== null) {
    return <Navigate to="/" />
  }

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h1>
      {
        error && (
          <p className={`text text_type_main-default text_color_error mt-10`}>
            При регистрации возникла ошибка
          </p>
        )
      }
      <form
        className={`mt-6 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <Input
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          type="text"
          extraClass="mt-6"
          name="name"
          error={!!errors.name}
          errorText={errors.name}
        />
        <Input
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          extraClass="mt-6"
          type="email"
          name="email"
          error={!!errors.email}
          errorText={errors.email}
        />
        <Input
          value={values.password}
          onChange={handleChange}
          placeholder="Пароль"
          extraClass="mt-6"
          type="password"
          name="password"
          error={!!errors.password}
          errorText={errors.password}
        />
        <Button
          extraClass={`mt-6 ${styles.button}`}
          htmlType="submit"
          disabled={loading}
        >
          Зарегистрироваться
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
          Уже зарегистрированы?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </main>
  );
}

export default RegistrationPage;
