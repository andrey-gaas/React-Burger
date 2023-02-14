import { useState, useMemo, useContext } from 'react';
import ConstructorContext from '../../services/ConstructorContext';
import converterIngredientsData from '../../utils/converterIngredientsData';

import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import List from './components/List/List';
import TotalPrice from './components/TotalPrice/TotalPrice';

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const { selectedIngredients } = useContext(ConstructorContext);
  const [isOpenModal, setOpenModal] = useState(false);

  const convertedIngredients = useMemo(() => converterIngredientsData(selectedIngredients), [selectedIngredients]);

  return (
    <>
      <section className={`${styles.container} mt-25`}>
        <List data={convertedIngredients} />
        <TotalPrice
          data={convertedIngredients}
          checkout={() => setOpenModal(true)}
        />
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

export default BurgerConstructor;
