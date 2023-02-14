import { useState } from 'react';
import dataType from '../../types/data';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import List from './components/List/List';

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <section className={`${styles.container} mt-25`}>
        <List />
        <section className={`${styles['total-contaier']} mt-10`}>
          <div className={styles.total}>
            <span className="text text_type_digits-medium mr-2">610</span>
            <CurrencyIcon />
          </div>
          <Button htmlType="button" extraClass='ml-10' onClick={() => setOpenModal(true)}>
            Оформить заказ
          </Button>
        </section>
      </section>
      {
        isOpenModal &&
          <Modal onClose={() => setOpenModal(false)}>
            <OrderDetails />
          </Modal>
      }
    </>
  );
}

BurgerConstructor.propTypes = {
  data: dataType,
};

export default BurgerConstructor;
