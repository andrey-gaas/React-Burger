import { useRef, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import AuthApi from '../../API/AuthApi';
import useAuth from '../../services/hooks/auth';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';

function ForgotPasswordPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setError('');
    setEmail(target.value);
  };

  const handleClick = async () => {
    if (!EmailValidator.validate(email)) {
      setError('Введите валидный Email');
      return;
    }

    let result = null;

    try {
      result = await AuthApi.forgotPassword(email);
    } catch(error) {
      console.log(error);
    }

    if (result.success) {
      localStorage.setItem('reset', true);
      navigate('/reset-password');
    }
  };

  if (user !== null) {
    return <Navigate to="/" replace />
  }

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
        error={!!error}
        errorText={error}
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
