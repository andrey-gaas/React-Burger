import * as actions from '../actions/order';
import { IOrder } from '../../types/order';

interface IOrderActionSuccess {
  readonly type: typeof actions.FETCH_ORDER_SUCCESS;
  readonly data: IOrder;
}

interface IOrderActions {
  readonly type: typeof actions.FETCH_ORDER | typeof actions.FETCH_ORDER_FAIL | typeof actions.CLOSE_CREATED_ORDER;
}

export type TOrderActionCreators = IOrderActionSuccess | IOrderActions;

export const orderActionCreators = {
  fetchOrder: (): TOrderActionCreators => ({ type: actions.FETCH_ORDER }),
  fetchOrderSuccess: (data: IOrder): TOrderActionCreators => ({ type: actions.FETCH_ORDER_SUCCESS, data }),
  fetchOrderFail: (): TOrderActionCreators => ({ type: actions.FETCH_ORDER_FAIL }),

  closeCreatedOrder: (): TOrderActionCreators => ({ type: actions.CLOSE_CREATED_ORDER }),
};

