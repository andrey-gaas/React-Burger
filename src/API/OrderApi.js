import request from "../utils/request";

class OrderApi {
  static async createOrder(ingredients) {
    return request('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ingredients,
      }),
    });
  }
}

export default OrderApi;
