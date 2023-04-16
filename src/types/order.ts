import { IIngredient } from "./ingredient";
import { IUser } from './auth';

export interface IOrder {
  success: boolean;
  name: string;
  order: {
    ingredients: IIngredient[];
    _id: string;
    owner: IUser;
    status: string;
    number: number;
    price: number;
  };
}

export interface IGeneralOrders {
  success: boolean;
  orders: Array<{
    _id: string;
    status: 'done' | 'pending';
    name: string;
    number: number;
    createdAt: string;
    ingredients: string[];
  }>;
  total: number;
  totalToday: number;
}

export interface IUserOrders {
  success: boolean;
  orders: Array<{
    _id: string;
    ingredients: string[];
    status: 'done';
    name: string;
    number: number;
    createdAt: string;
  }>;
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
