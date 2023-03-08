import { useState } from 'react';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './Profile.module.css';

function Profile() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  return (
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
    </section>
  );
}

export default Profile;
