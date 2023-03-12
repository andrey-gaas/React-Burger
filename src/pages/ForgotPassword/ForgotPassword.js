import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useForm from '../../services/hooks/useForm';
import useAuth from '../../services/hooks/auth';
import * as EmailValidator from 'email-validator';
import AuthApi from '../../API/AuthApi';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './ForgotPassword.module.css';

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, errors, setErrors } = useForm(
    { email: '' },
    { email: '' },
  );
  const { user } = useAuth();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!values.email) {
      return setErrors({ email: 'Введите Email' });
    }

    if (!EmailValidator.validate(values.email)) {
      return setErrors({ email: 'Введите валидный Email' });
    }

    let result = null;
    setLoading(true);

    try {
      result = await AuthApi.forgotPassword(values.email);
    } catch(error) {
      console.log(error);
    }

    if (result.success) {
      setLoading(false);
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
      <form
        className={`mt-6 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <EmailInput
          value={values.email}
          onChange={handleChange}
          placeholder="Укажите e-mail"
          extraClass="mt-6"
          name="email"
          error={!!errors.email}
          errorText={errors.email}
        />
        <Button
          extraClass={`mt-6 ${styles.button}`}
          htmlType="submit"
          disabled={loading}
        >
          Восстановить
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
