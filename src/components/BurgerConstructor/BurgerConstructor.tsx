import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ingredientsActionCreators } from '../../services/actionCreators/ingredients';
import { orderActionCreators } from '../../services/actionCreators/order';
import { getIngredients, getOrder } from '../../services/selectors';
import fetchOrder from '../../services/thunks/fetchOrder';
import converterIngredientsData from '../../utils/converterIngredientsData';
import useAuth from '../../services/hooks/auth';
import { IIngredient, IIngredientWithKey } from '../../types/ingredient';

import Modal from '../Modal/Modal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import List from './components/List/List';
import TotalPrice from './components/TotalPrice/TotalPrice';

import styles from "./BurgerConstructor.module.css";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

function BurgerConstructor() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedIngredients } = useSelector(getIngredients);
  const { loading, createdOrder } = useSelector(getOrder);
  const { user } = useAuth();

  // eslint-disable-next-line
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (ingredient: IIngredient) => {
      if (selectedIngredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
        dispatch(ingredientsActionCreators.removeBun());
      }
      dispatch(ingredientsActionCreators.addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const convertedIngredients: IIngredientWithKey[] = useMemo(() => converterIngredientsData(selectedIngredients), [selectedIngredients]);

  const createOrder = async () => {
    if (convertedIngredients.length === 0) return;

    if (!user) {
      return navigate('/login', { state: { from: '/' } });
    }

    dispatch(fetchOrder(convertedIngredients.map(item => item._id)));
  };

  const closeCreatedOrder = () => {
    dispatch(orderActionCreators.closeCreatedOrder());
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
