import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { Link, Navigate } from 'react-router-dom';
import fetchLoginThunk from '../../services/thunks/fetchLogin';
import { getLoginData } from '../../services/selectors';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Login.module.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(getLoginData);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setErrors({ ...errors, [`${target.name}Error`]: '' });
    setState({ ...state, [target.name]: target.value });
  };

  const handleClick = () => {
    const { email, password } = state;

    if (!EmailValidator.validate(email)) {
      return setErrors({ ...errors, emailError: 'Введите валидный Email' });
    }

    if (!password) {
      return setErrors({ ...errors, passwordError: 'Введите пароль' });
    }

    dispatch(fetchLoginThunk(email, password));
  };
 
  if (user !== null) {
    const redirect = localStorage.getItem('redirect');

    if (redirect) {
      return <Navigate to={redirect} />
    }

    return <Navigate to="/" replace />
  }

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
      <Input
        ref={emailRef}
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        extraClass="mt-6"
        name="email"
        error={!!errors.emailError}
        errorText={errors.emailError}
      />
      <Input
        ref={passwordRef}
        value={state.password}
        onChange={handleChange}
        placeholder="Пароль"
        type={showPassword ? 'text' : 'password'}
        extraClass="mt-6"
        name="password"
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={onIconClick}
        error={!!errors.passwordError}
        errorText={errors.passwordError}
      />
      <Button
        extraClass={`mt-6 ${styles.button}`}
        htmlType="button"
        onClick={handleClick}
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
