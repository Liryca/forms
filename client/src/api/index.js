import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config; // Возвращаем исходный запрос, если все нормально
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true; // Помечаем запрос как повторный
      try {
        const response = await axios.post(`${API_URL}/token`, {
          token: localStorage.getItem("refreshToken"), // Предполагается, что refresh token хранится в localStorage
        });

        localStorage.setItem("token", response.data.accessToken); // Сохраняем новый access token
        return $api.request(originalRequest); // Повторный запрос с новым access token
      } catch (e) {
        console.log("Не авторизован"); // Обработка случая, когда получение токена не удалось
      }
    }
    throw error; // Если ошибка не 401, пробрасываем ее дальше
  }
);
export default $api;
