import request from "../utils/request";

class OrderApi {
  static async registration(email: string, password: string, name: string) {
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

  static async login(email: string, password: string) {
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

  static async forgotPassword(email: string) {
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

  static async resetPassword(password: string, token: string) {
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

  static async updateToken(refreshToken: string, accessToken: string) {
    return request('/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  }

  static async fetchUserData(accessToken: string) {
    return request('/api/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': accessToken,
      },
    });
  }

  static async updateUser(accessToken: string, body: { name: string; email: string; password?: string }) {
    return request('/api/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': accessToken,
      },
      body: JSON.stringify(body),
    });
  }

  static async logout(refreshToken: string | undefined) {
    return request('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  }
}

export default OrderApi;
