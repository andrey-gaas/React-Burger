import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleClick = () => {
    navigate('/reset-password', { replace: true });
  };

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
      <Input
        ref={inputRef}
        value={email}
        onChange={handleChange}
        placeholder="Укажите e-mail"
        type="email"
        extraClass="mt-6"
        name="email"
      />
      <Button extraClass="mt-6" htmlType="button" onClick={handleClick}>
        Восстановить
      </Button>
      <div className="mt-20 text text_type_main-default text_color_inactive">
        <span>
          Вспомнили пароль?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
