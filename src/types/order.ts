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

export interface IOrderData {
  createdOrder: null | IOrder;
  loading: boolean;
  hasError: boolean;
}
