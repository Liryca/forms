import axios from "axios";
export default class AuthService {
  static async login(email, password) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
      email,
      password,
    });
  }

  static async registration(username, email, password) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      username,
      email,
      password,
    });
  }

  static async logout() {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`);
  }
}
