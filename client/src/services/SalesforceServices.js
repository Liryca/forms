import $api from "../api";

class SalesforceServices {
  static async createAccount({ firstName, lastName, email }) {
    try {
      const response = await $api.post(`api/users/salesforse`, {
        firstName,
        lastName,
        email,
      });
      return response.data;
    } catch (e) {
      return Promise.reject("You already have a salesforce account");
    }
  }
  static async getAccount({ email }) {
    try {
      const response = await $api.post(`api/users/salesforse/account`, {
        email,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default SalesforceServices;
