import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Registration.module.css';

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const nameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

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
      />
      <Input
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        extraClass="mt-6"
        name="email"
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
      />
      <Button extraClass="mt-6" htmlType="button">
        Вход
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
