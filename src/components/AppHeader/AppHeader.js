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
          <a href="#" className={`${styles.button} pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="ml-2 text text_type_main-default text_color_primary">
              Конструктор
            </p>
          </a>
          <a href="#" className={`${styles.button} pl-5 pr-5 ml-2`}>
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </a>
        </div>

        <div className={styles["logo-container"]}>
          <Logo />
        </div>

        <div className={styles["personal-area-container"]}>
          <button className={`${styles.button} pl-5 pr-5`}>
            <ProfileIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">
              Личный кабинет
            </p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
