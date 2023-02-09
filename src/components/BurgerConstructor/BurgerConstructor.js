import { useState } from 'react';

import dataType from '../../types/data';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor(props) {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <section className={`${styles.container} mt-25`}>
        <ul className={styles.list}>
          <li className={styles['list-item']}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={20}
              thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
              extraClass={`${styles.ingredient} ml-8`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус традиционный галактический"
              price={30}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
              extraClass={`${styles.ingredient} ml-2`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Мясо бессмертных моллюсков Protostomia"
              price={300}
              thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
              extraClass={`${styles.ingredient} ml-2`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Плоды Фалленианского дерева"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
              extraClass={`${styles.ingredient} ml-2`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
              extraClass={`${styles.ingredient} ml-2`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
              extraClass={`${styles.ingredient} ml-2`}
            />
          </li>
          <li className={`${styles['list-item']} mt-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={20}
              thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
              extraClass={`${styles.ingredient} ml-8`}
            />
          </li>
        </ul>
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
