import * as actions from '../actions/order';
import { IOrder } from '../../types/order';

export type TConnectionType = 'general' | 'user';

interface IOrderActionSuccess {
  readonly type: typeof actions.FETCH_ORDER_SUCCESS;
  readonly data: IOrder;
}

interface IGetDataOrdersList {
  readonly type: typeof actions.GET_DATA_ORDERS_LIST;
  readonly data: any;
  readonly connection: TConnectionType;
}

interface IConnectionToWS {
  readonly type:
  | typeof actions.CONNECTION_TO_ORDERS_LIST
  | typeof actions.CONNECTION_TO_ORDERS_LIST_SUCCESS
  | typeof actions.CONNECTION_TO_ORDERS_LIST_FAIL
  | typeof actions.CLOSE_CONNECTION
  | typeof actions.ERROR_CONNECTION;
  readonly connection: TConnectionType;
  readonly accessToken?: string;
}

interface IOrderActions {
  readonly type:
  | typeof actions.FETCH_ORDER
  | typeof actions.FETCH_ORDER_FAIL
  | typeof actions.CLOSE_CREATED_ORDER;
}

export type TOrderActionCreators = IOrderActionSuccess | IOrderActions | IGetDataOrdersList | IConnectionToWS;

export const orderActionCreators = {
  fetchOrder: (): TOrderActionCreators => ({ type: actions.FETCH_ORDER }),
  fetchOrderSuccess: (data: IOrder): TOrderActionCreators => ({ type: actions.FETCH_ORDER_SUCCESS, data }),
  fetchOrderFail: (): TOrderActionCreators => ({ type: actions.FETCH_ORDER_FAIL }),

  closeCreatedOrder: (): TOrderActionCreators => ({ type: actions.CLOSE_CREATED_ORDER }),

  connectionToOrdersList: (connection: TConnectionType, accessToken?: string): TOrderActionCreators => ({ type: actions.CONNECTION_TO_ORDERS_LIST, connection, ...(accessToken && { accessToken }) }),
  connectionToOrdersListSuccess: (connection: TConnectionType): TOrderActionCreators => ({ type: actions.CONNECTION_TO_ORDERS_LIST_SUCCESS, connection }),
  connectionToOrdersListFail: (connection: TConnectionType): TOrderActionCreators => ({ type: actions.CONNECTION_TO_ORDERS_LIST_FAIL, connection }),
  getDataOrdersList: (data: any, connection: TConnectionType): TOrderActionCreators => ({ type: actions.GET_DATA_ORDERS_LIST, data, connection }),
  closeConnection: (connection: TConnectionType): TOrderActionCreators => ({ type: actions.CLOSE_CONNECTION, connection }),
  errorConnection: (connection: TConnectionType): TOrderActionCreators => ({ type: actions.ERROR_CONNECTION, connection }),
};

