import axios from "axios";
import { Navigate } from "react-router-dom";

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  $api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status == 401 &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.post(`${API_URL}/api/auth/refresh`, {
            token: localStorage.getItem("refreshToken"),
          });
          console.log(response, "api");
          localStorage.setItem("token", response.data.accessToken);
          return $api.request(originalRequest);
        } catch (e) {
          console.log("User is not authorized.");
          // Возможно, добавить перенаправление на страницу входа или очистить токены
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          throw error;
        }
      }
    }
  )
);
export default $api;
