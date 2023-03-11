import request from "../utils/request";

class OrderApi {
  static async createOrder(ingredients, accessToken) {
    return request('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        ingredients,
      }),
    });
  }
}

export default OrderApi;
