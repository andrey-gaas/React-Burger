import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import actionCreatorsIngredient from '../../services/actionCreators/ingredients';
import actionCreatorsOrder from '../../services/actionCreators/order';
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
  const { loading, createdOrder } = useSelector(getOrder);

  // eslint-disable-next-line
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: ingredient => {
      if (selectedIngredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
        dispatch(actionCreatorsIngredient.removeBun());
      }
      dispatch(actionCreatorsIngredient.addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const convertedIngredients = useMemo(() => converterIngredientsData(selectedIngredients), [selectedIngredients]);

  const createOrder = async () => {
    if (convertedIngredients.length === 0) return;
    dispatch(fetchOrder(convertedIngredients.map(item => item._id)));
  };

  const closeCreatedOrder = () => {
    dispatch(actionCreatorsOrder.closeCreatedOrder());
  };

  return (
    <>
      <section className={`${styles.container} mt-25`} ref={dropTarget}>
        <List data={convertedIngredients} backlight={isHover} />
        <TotalPrice
          data={convertedIngredients}
          checkout={createOrder}
          loading={loading}
        />
      </section>
      {
        createdOrder && createdOrder.success &&
          <Modal onClose={closeCreatedOrder}>
            <OrderDetails orderNumber={createdOrder.order.number} />
          </Modal>
      }
    </>
  );
}

export default BurgerConstructor;
