import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../services/selectors';
import fetchUserData from '../../services/thunks/fetchUserData';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';

function Profile() {
  const { user, loading, error } = useSelector(getUserData);
  const dispatch = useDispatch();
  
  const [userLoading, setUserLoading] = useState(null);
  const [state, setState] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
  });

  useEffect(() => {
    if (user === null) {
      setUserLoading(true);
      dispatch(fetchUserData());
    }
  }, [user, dispatch]);

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
    setState({ ...state, [target.name]: target.value });
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
            />
            <Input
              value={state.email}
              onChange={handleChange}
              placeholder="Логин"
              type="email"
              extraClass="mt-6"
              name="email"
              icon="EditIcon"
            />
            <Input
              value={state.password}
              onChange={handleChange}
              placeholder="Пароль"
              type="password"
              extraClass="mt-6"
              name="password"
              icon="EditIcon"
            />

            <div className={`mt-10 ${styles['buttons-container']}`}>
              <Button
                htmlType="button"
              >
                Сохранить
              </Button>
              <Button
                htmlType="button"
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
