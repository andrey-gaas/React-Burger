import * as actions from '../actions/order';
import { IOrderData } from '../../types/order';
import { TOrderActionCreators } from '../actionCreators/order';

const initialState: IOrderData = {
  createdOrder: null,
  lists: {
    general: null,
    user: null,
  },
  connections: {
    general: false,
    user: false,
  },
  errors: {
    create: false,
    connection: false,
  },
  loading: {
    create: false,
    general: false,
    user: false,
  },
};

function orderReducer(state: IOrderData = initialState, action: TOrderActionCreators): IOrderData {
  switch (action.type) {
    case actions.FETCH_ORDER:
      return { ...state, errors: { ...state.errors, create: false }, loading: { ...state.loading, create: true } };
    case actions.FETCH_ORDER_SUCCESS:
      return { ...state, errors: { ...state.errors, create: false }, loading: { ...state.loading, create: false }, createdOrder: action.data };
    case actions.FETCH_ORDER_FAIL:
      return { ...state, errors: { ...state.errors, create: true }, loading: { ...state.loading, create: false } };

    case actions.CLOSE_CREATED_ORDER:
      return { ...state, createdOrder: null };

    case actions.CONNECTION_TO_ORDERS_LIST:
      return { ...state, errors: { ...state.errors, connection: false }, loading: { ...state.loading, [action.connection]: true } };
    case actions.CONNECTION_TO_ORDERS_LIST_SUCCESS:
      return { ...state, connections: { ...state.connections, [action.connection]: true }, errors: { ...state.errors, connection: false }, loading: { ...state.loading, [action.connection]: false } };
    case actions.CONNECTION_TO_ORDERS_LIST_FAIL:
      return { ...state, connections: { ...state.connections, [action.connection]: false }, errors: { ...state.errors, connection: true }, loading: { ...state.loading, [action.connection]: false } };
    case actions.CLOSE_CONNECTION:
      return { ...state, connections: { ...state.connections, [action.connection]: false } };
    case actions.ERROR_CONNECTION:
      return { ...state, connections: { ...state.connections, [action.connection]: false }, errors: { ...state.errors, connection: true } };
    case actions.GET_DATA_ORDERS_LIST:
      return { ...state, lists: { ...state.lists, [action.connection]: action.data } };

    default:
      return state;
  }
}

export default orderReducer;
