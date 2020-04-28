export class Auth {
  static setToken(token) {
    window.localStorage.setItem('token', token);
  }

  static getToken() {
    return window.localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!window.localStorage.getItem('token');
  }

  static clearToken() {
    window.localStorage.removeItem('token');
  }
}
