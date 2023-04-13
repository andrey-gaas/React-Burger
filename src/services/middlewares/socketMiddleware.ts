import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, TStore, TStoreActions } from '../../types/store';
import * as actions from '../actions/order';
import { orderActionCreators, TConnectionType } from '../actionCreators/order';
import { WS_ORDERS_URL, WS_ORDERS_USER_URL } from '../../constants/api';

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TStore>) => {
    let socket: WebSocket | null = null;

    return next => (action: TStoreActions) => {
      const { dispatch } = store;
      let connection: TConnectionType;
      const { type } = action;

      if (type === actions.CONNECTION_TO_ORDERS_LIST) {
        const url: string = action.accessToken ? `${WS_ORDERS_USER_URL}?token=${action.accessToken.slice(7)}` : WS_ORDERS_URL;

        connection = action.connection;
        socket = new WebSocket(url);
      }

      if (type === actions.CONNECTION_TO_ORDERS_LIST && socket) {
        socket.onopen = event => {
          dispatch(orderActionCreators.connectionToOrdersListSuccess(connection));
        };

        socket.onerror = event => {
          dispatch(orderActionCreators.connectionToOrdersListFail(connection));
        };

        socket.onmessage = event => {
          const { data } = event;

          dispatch(orderActionCreators.getDataOrdersList(JSON.parse(data), connection));
        };

        socket.onclose = event => {
          dispatch(orderActionCreators.closeConnection(connection));
        };
      }

      next(action);
    }
  }) as Middleware;
};
