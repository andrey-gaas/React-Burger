import { useState, useMemo, useContext } from 'react';
import ConstructorContext from '../../services/ConstructorContext';
import converterIngredientsData from '../../utils/converterIngredientsData';
import OrderApi from '../../API/OrderApi';

import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import List from './components/List/List';
import TotalPrice from './components/TotalPrice/TotalPrice';

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const { selectedIngredients } = useContext(ConstructorContext);
  const [isOpenModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState({
    loading: false,
    hasError: false,
    data: null,
  });

  const convertedIngredients = useMemo(() => converterIngredientsData(selectedIngredients), [selectedIngredients]);

  const createOrder = async () => {
    if (convertedIngredients.length === 0) return;
    setOrder({ ...order, loading: true });

    try {
      const result = await OrderApi.createOrder(convertedIngredients.map(item => item._id));

      setOrder({ ...order, loading: false, data: result.order });
      setOpenModal(true);
    } catch(error) {
      setOrder({ ...order, loading: false, hasError: true });
    }
  };

  return (
    <>
      <section className={`${styles.container} mt-25`}>
        <List data={convertedIngredients} />
        <TotalPrice
          data={convertedIngredients}
          checkout={createOrder}
        />
      </section>
      {
        isOpenModal &&
          <Modal onClose={() => setOpenModal(false)}>
            <OrderDetails orderNumber={order.data.number} />
          </Modal>
      }
    </>
  );
}

export default BurgerConstructor;
