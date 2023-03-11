import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { getUserData, getUserUpdate } from '../../services/selectors';
import fetchUserData from '../../services/thunks/fetchUserData';
import fetchEditUser from '../../services/thunks/fetchEditUser';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../components';
import styles from './Profile.module.css';

function Profile() {
  const { user, loading, error } = useSelector(getUserData);
  const { loadingUpdate } = useSelector(getUserUpdate);
  const dispatch = useDispatch();
  
  const [userLoading, setUserLoading] = useState(null);
  const [state, setState] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
  });
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    if (user === null) {
      setUserLoading(true);
      dispatch(fetchUserData());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (user && userLoading) {
      setUserLoading(false);
      setState({
        ...state,
        name: user.name,
        email: user.email,
      });
    }
  }, [userLoading, user, state]);

  const handleChange = ({ target }) => {
    setErrors({ ...errors, [`${target.name}Error`]: '' });
    setState({ ...state, [target.name]: target.value });
  };

  const reset = () => {
    setState({
      name: user.name,
      email: user.email,
      password: '',
    });
  };

  const save = () => {
    const { name, email, password } = state;

    if (!name) {
      return setErrors({ ...errors, nameError: 'Поле не может быть пустым' });
    }

    if (!email) {
      return setErrors({ ...errors, emailError: 'Поле не может быть пустым' });
    }

    if (!EmailValidator.validate(email)) {
      return setErrors({ ...errors, emailError: 'Вы указали невалидный Email' });
    }

    if (password && password.length < 6) {
      return setErrors({ ...errors, passwordError: 'Пароль должен содержать не менее 6 символов' });
    }

    const body = {
      name: name,
      email: email,
      ...(password ? { password } : {}),
    };

    dispatch(fetchEditUser(body));
  };

  return (
    <>
      {
        !user && loading &&
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p>
      }
      {
        error &&
          <p className={`${styles.message} text text_type_main-medium`}>Произошла ошибка :(</p>
      }
      {
        user && (
          <section>
            <Input
              value={state.name}
              onChange={handleChange}
              placeholder="Имя"
              type="text"
              extraClass="mt-6"
              name="name"
              icon="EditIcon"
              error={!!errors.nameError}
              errorText={errors.nameError}
            />
            <Input
              value={state.email}
              onChange={handleChange}
              placeholder="Логин"
              type="email"
              extraClass="mt-6"
              name="email"
              icon="EditIcon"
              error={!!errors.emailError}
              errorText={errors.emailError}
            />
            <Input
              value={state.password}
              onChange={handleChange}
              placeholder="Пароль"
              type="password"
              extraClass="mt-6"
              name="password"
              icon="EditIcon"
              error={!!errors.passwordError}
              errorText={errors.passwordError}
            />

            <div className={`mt-10 ${styles['buttons-container']}`}>
              <Button
                extraClass={styles.button}
                htmlType="button"
                onClick={save}
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
                htmlType="button"
                onClick={reset}
              >
                Отмена
              </Button>
            </div>
          </section>
        )
      }
    </>
  );
}

export default Profile;
