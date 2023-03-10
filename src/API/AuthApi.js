import request from "../utils/request";

class OrderApi {
  static async registration(email, password, name) {
    return request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }

  static async login(email, password) {
    return request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  static async forgotPassword(email) {
    return request('/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email,
      }),
    });
  }

  static async resetPassword(password, token) {
    return request('/api/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        password,
        token,
      }),
    });
  }
}

export default OrderApi;
