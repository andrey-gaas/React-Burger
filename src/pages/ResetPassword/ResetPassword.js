import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthApi from '../../API/AuthApi';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css';

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    password: '',
    code: '',
  });
  const [errors, setErrors] = useState({
    passwordError: '',
    codeError: '',
  });
  const navigate = useNavigate();
  const passwordRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
    setErrors({ ...errors, [`${target.name}Error`]: '' });
  };

  const handleClick = async () => {
    const { password, code } = state;

    if (!password) {
      return setErrors({ ...errors, passwordError: 'Введите новый пароль' });
    }

    if (!code) {
      return setErrors({ ...errors, codeError: 'Введите код из письма' });
    }

    let result = null;

    try {
      result = await AuthApi.resetPassword(password, code);
    } catch(error) {
      console.log(error);
    }

    if (result.success) {
      navigate('/login', { replace: true });
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
      <Input
        ref={passwordRef}
        value={state.password}
        onChange={handleChange}
        placeholder="Введите новый пароль"
        type={showPassword ? 'text' : 'password'}
        extraClass="mt-6"
        name="password"
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={onIconClick}
        error={!!errors.passwordError}
        errorText={errors.passwordError}
      />
      <Input
        value={state.code}
        onChange={handleChange}
        placeholder="Введите код из письма"
        type="text"
        extraClass="mt-6"
        name="code"
        error={!!errors.codeError}
        errorText={errors.codeError}
      />
      <Button extraClass="mt-6" htmlType="button" onClick={handleClick}>
        Сохранить
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

export default ResetPasswordPage;