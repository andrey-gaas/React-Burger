import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients, getOrder } from '../../services/selectors';
import fetchOrder from '../../services/thunks/fetchOrder';
import converterIngredientsData from '../../utils/converterIngredientsData';

import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import List from './components/List/List';
import TotalPrice from './components/TotalPrice/TotalPrice';

import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { selectedIngredients } = useSelector(getIngredients);
  const { loading, data } = useSelector(getOrder);

  const convertedIngredients = useMemo(() => converterIngredientsData(selectedIngredients), [selectedIngredients]);

  const createOrder = async () => {
    if (convertedIngredients.length === 0) return;
    dispatch(fetchOrder(convertedIngredients.map(item => item._id)));
  };

  return (
    <>
      <section className={`${styles.container} mt-25`}>
        <List data={convertedIngredients} />
        <TotalPrice
          data={convertedIngredients}
          checkout={createOrder}
          loading={loading}
        />
      </section>
      {
        data &&
          <Modal onClose={() => console.log('CLOSE')}>
            <OrderDetails orderNumber={data.number} />
          </Modal>
      }
    </>
  );
}

export default BurgerConstructor;
