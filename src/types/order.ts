import { IIngredient } from "./ingredient";
import { IUser } from './auth';

export interface IOrder {
  success: boolean;
  name: string;
  order: {
    ingredients: IIngredient[];
    _id: string;
    owner: IUser;
    status: 'done' | 'pending' | 'created';
    number: number;
    price: number;
  };
}

export interface IWSOrderData {
  _id: string;
  status: 'done' | 'pending' | 'created';
  name: string;
  number: number;
  createdAt: string;
  ingredients: string[];
}

export interface IGeneralOrders {
  success: boolean;
  orders: IWSOrderData[];
  total: number;
  totalToday: number;
}

export interface IUserOrderData {
  _id: string;
  status: 'done' | 'pending' | 'created';
  name: string;
  number: number;
  createdAt: string;
  ingredients: string[];
}

export interface IUserOrderData {
  _id: string;
  ingredients: string[];
  status: 'done' | 'pending' | 'created';
  name: string;
  number: number;
  createdAt: string;
}

export interface IUserOrders {
  success: boolean;
  orders: IUserOrderData[];
  total: number;
  totalToday: number;
}

export interface IOrderData {
  createdOrder: null | IOrder;
  lists: {
    general: null | IGeneralOrders;
    user: null | IUserOrders;
  };
  connections: {
    general: boolean;
    user: boolean;
  };
  loading: {
    create: boolean;
    general: boolean;
    user: boolean;
  };
  errors: {
    create: boolean;
    connection: boolean;
  };
}
