class AuthClass {
  setToken(token) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  removeToken() {
    window.localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!window.localStorage.getItem('token');
  }
}

export const Auth = new AuthClass();
