import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useForm from '../../services/hooks/useForm';
import useAuth from '../../services/hooks/auth';
import AuthApi from '../../API/AuthApi';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './ResetPassword.module.css';

function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, errors, setErrors } = useForm(
    { password: '', code: '' },
    { password: '', code: '' },
  );
  const { user } = useAuth();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!values.password) {
      return setErrors({ ...errors, password: 'Введите новый пароль' });
    }

    if (values.password.length < 6 || values.password.length > 16) {
      return setErrors({ ...errors, password: 'Пароль должен содержать от 6 до 16 символов' });
    }

    if (!values.code) {
      return setErrors({ ...errors, code: 'Введите код из письма' });
    }

    let result: any = null;
    setLoading(true);

    try {
      result = await AuthApi.resetPassword(values.password, values.code);
    } catch (error) {
      console.log(error);
    }

    if (result.success) {
      setLoading(false);
      localStorage.removeItem('reset');
      navigate('/login', { replace: true });
    }
  };

  if (user !== null || !localStorage.getItem('reset')) {
    return <Navigate to="/" replace />
  }

  return (
    <main className={styles.container}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
      <form
        className={`mt-6 ${styles.form}`}
        onSubmit={handleSubmit}
      >
        <Input
          value={values.password}
          onChange={handleChange}
          placeholder="Введите новый пароль"
          extraClass="mt-6"
          type="password"
          name="password"
          error={!!errors.password}
          errorText={errors.password}
        />
        <Input
          value={values.code}
          onChange={handleChange}
          placeholder="Введите код из письма"
          type="text"
          extraClass="mt-6"
          name="code"
          error={!!errors.code}
          errorText={errors.code}
        />
        <Button
          extraClass={`mt-6 ${styles.button}`}
          htmlType="submit"
          disabled={loading}
        >
          Сохранить
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

export default ResetPasswordPage;
