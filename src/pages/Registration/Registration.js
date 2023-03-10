import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { getRegistrationData } from '../../services/selectors';
import registrationThunk from '../../services/thunks/fetchRegistration';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Registration.module.css';

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });
  const nameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(getRegistrationData);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setErrors({ ...errors, [`${target.name}Error`]: '' });
    setState({ ...state, [target.name]: target.value });
  };

  const handleClick = () => {
    const { name, email, password } = state;

    if (!name) {
      return setErrors({ ...errors, nameError: 'Введите ваше имя' });
    }

    if (!EmailValidator.validate(email)) {
      return setErrors({ ...errors, emailError: 'Введите валидный Email' });
    }

    if (!password || password.length < 6) {
      return setErrors({ ...errors, passwordError: 'Пароль должен содержать от 6 до 16 символов' });
    }

    dispatch(registrationThunk(name, email, password));
  };

  if (user !== null) {
    return <Navigate to="/" />
  }

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h1>
      <Input
        ref={nameRef}
        value={state.name}
        onChange={handleChange}
        placeholder="Имя"
        type="text"
        extraClass="mt-6"
        name="name"
        error={!!errors.nameError}
        errorText={errors.nameError}
      />
      <Input
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
        Зарегистрироваться
        {
          loading && (
          <div className={`${styles['loader-container']} ml-2`}>
            <Loader />
          </div>
        )}
      </Button>
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
