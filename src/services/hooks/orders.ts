import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getOrder } from '../selectors';
import { IOrderData } from '../../types/order';
import { orderActionCreators } from '../actionCreators/order';
import Cookies from '../../utils/cookies';

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

interface IUseOrder {
  order: IOrderData;
}

function useOrders(): IUseOrder {
  const dispatch: AppDispatch = useDispatch();
  const order = useSelector(getOrder);
  const accessToken = Cookies.getCookie('token');

  // Подключение к WS, и загрузка данных, если их нет
  useEffect(() => {
    if (!order.connections.general) {
      dispatch(orderActionCreators.connectionToOrdersList('general'));
    }

    // Если есть accessToken, грузим заказы пользователя
    if (!order.connections.user && accessToken) {
      dispatch(orderActionCreators.connectionToOrdersList('user', accessToken));
    }
  }, [dispatch, order.connections.general, order.connections.user, accessToken]);


  return {
    order,
  };
}

export default useOrders;
