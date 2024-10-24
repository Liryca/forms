import axios from "axios";
import $api from "../api";

export default class AuthService {
  static async login(email, password) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      email,
      password,
    });
  }

  static async registration(username, email, password) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      username,
      email,
      password,
    });
  }

  static async checkToken() {
    const response = await $api.get(`/api/auth/user/info`);
    return response;
  }
}
