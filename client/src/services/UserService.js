import $api from "../api";

class UsersService {
  static async getAllUsersPagination({ pageParam }) {
    try {
      const response = await $api.get(
        `${process.env.REACT_APP_API_URL}/api/users?page=${pageParam.page}  &limit=${pageParam.limit}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const response = await $api.get(`/api/users/users`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUseInfoById(userId) {
    try {
      const response = await $api.get(`/api/users/infoById/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    const response = await $api.delete(`/api/users/${userId}`);
    return response.data;
  }

  static async changeRoleUser({ userId, role }) {
    try {
      const response = await $api.patch(`/api/users/${userId}/change-role`, {
        role: role === "admin" ? "user" : "admin",
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
  static async changeStatusUser({ userId, status }) {
    try {
      const response = await $api.patch(`/api/users/${userId}/change-status`, {
        status: Number(status) === 0 ? 1 : 0,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default UsersService;
