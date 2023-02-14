import { CREATE_ORDER_URL } from '../constants/api';
import checkResponse from '../utils/checkResponse';

class OrderApi {
  static async createOrder(ingredients) {
    let result = await fetch(CREATE_ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ingredients,
      }),
    });

    result = await checkResponse(result);

    return result;
  }
}

export default OrderApi;
