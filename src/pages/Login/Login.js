import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Login.module.css';

function LoginPage() {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const onIconClick = () => {
    setShow(!show);
    passwordRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

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
      />
      <Input
        ref={passwordRef}
        value={state.password}
        onChange={handleChange}
        placeholder="Пароль"
        type={show ? 'text' : 'password'}
        extraClass="mt-6"
        name="password"
        icon={show ? 'HideIcon' : 'ShowIcon'}
        onIconClick={onIconClick}
      />
      <Button extraClass="mt-6" htmlType="button">
        Вход
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
