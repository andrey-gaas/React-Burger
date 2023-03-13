import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { getUserUpdate } from '../../services/selectors';
import fetchEditUser from '../../services/thunks/fetchEditUser';
import useAuth from '../../services/hooks/auth';
import useForm from '../../services/hooks/useForm';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const { loadingUpdate } = useSelector(getUserUpdate);
  const { user, error } = useAuth();
  const { values, handleChange, errors, setErrors, resetForm } = useForm(
    { name: user.name, email: user.email, password: '' },
    { name: '', email: '', password: '' },
  );

  const handleSubmit = event => {
    event.preventDefault();
    
    if (!values.name) {
      return setErrors({ ...errors, name: 'Поле не может быть пустым' });
    }

    if (!values.email) {
      return setErrors({ ...errors, email: 'Поле не может быть пустым' });
    }

    if (!EmailValidator.validate(values.email)) {
      return setErrors({ ...errors, email: 'Вы указали невалидный Email' });
    }

    if (values.password && (values.password.length < 6 || values.password.length > 16)) {
      return setErrors({ ...errors, password: 'Пароль должен содержать от 6 символов до 16 символов' });
    }

    const body = {
      name: values.name,
      email: values.email,
      ...(values.password ? { password: values.password } : {}),
    };

    dispatch(fetchEditUser(body));
  }

  const handleReset = event => {
    event.preventDefault();
    resetForm(
      { name: user.name, email: user.email, password: '' },
      { name: '', email: '', password: '' },
    );
    setShowButtons(false);
  }

  return (
    <>
      {
        error &&
          <p className={`${styles.message} text text_type_main-medium`}>Произошла ошибка :(</p>
      }
      {
        !error && (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <Input
              value={values.name}
              onChange={event => {handleChange(event); setShowButtons(true)}}
              placeholder="Имя"
              type="text"
              extraClass="mt-6"
              name="name"
              icon="EditIcon"
              error={!!errors.name}
              errorText={errors.name}
            />
            <EmailInput
              value={values.email}
              onChange={event => {handleChange(event); setShowButtons(true)}}
              placeholder="Логин"
              extraClass="mt-6"
              name="email"
              icon="EditIcon"
              error={!!errors.email}
              errorText={errors.email}
            />
            <PasswordInput
              value={values.password}
              onChange={event => {handleChange(event); setShowButtons(true)}}
              placeholder="Пароль"
              extraClass="mt-6"
              name="password"
              icon="EditIcon"
              error={!!errors.password}
              errorText={errors.password}
            />

            {
              showButtons &&  (
                <div className={`mt-10 ${styles['buttons-container']}`}>
                  <Button
                    extraClass={styles.button}
                    htmlType="submit"
                    disabled={loadingUpdate}
                  >
                    Сохранить
                    {
                      loadingUpdate && (
                      <div className={`${styles['loader-container']} ml-2`}>
                        <Loader />
                      </div>
                    )}
                  </Button>
                  <Button
                    htmlType="reset"
                  >
                    Отмена
                  </Button>
                </div>
              )
            }
          </form>
        )
      }
    </>
  );
}

export default Profile;
