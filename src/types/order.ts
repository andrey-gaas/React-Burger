import { IIngredient } from "./ingredient";

export interface IOrder {
  success: boolean;
  name: string;
  order: {
    ingredients: IIngredient[];
    _id: string;
    owner: {
      name: string;
      email: string;
    };
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
