import { Link } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrapper}>
        <div className={styles["buttons-container"]}>
          <Link to="/" className={`${styles.button} pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="ml-2 text text_type_main-default text_color_primary">
              Конструктор
            </p>
          </Link>
          <Link to="/" className={`${styles.button} pl-5 pr-5 ml-2`}>
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </Link>
        </div>

        <div className={styles["logo-container"]}>
          <Logo />
        </div>

        <div className={styles["personal-area-container"]}>
          <Link to="/profile">
            <button className={`${styles.button} pl-5 pr-5`}>
              <ProfileIcon type="secondary" />
              <p className="ml-2 text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
