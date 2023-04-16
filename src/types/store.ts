import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import store from '../store';
import { TAuthActionCreators } from '../services/actionCreators/auth';
import { TIngredientsActionCreators } from '../services/actionCreators/ingredients';
import { TOrderActionCreators } from '../services/actionCreators/order';

export type TStore = ReturnType<typeof store.getState>;

export type TStoreActions = TAuthActionCreators | TIngredientsActionCreators | TOrderActionCreators;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TStore, TStoreActions>
>;

export type AppDispatch = Dispatch<TStoreActions>;

