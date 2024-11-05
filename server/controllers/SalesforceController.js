const axios = require("axios");
require("dotenv").config();

class SalesforceController {
  static async getAccessToken() {
    const response = await axios.post(process.env.SALESFORCE_LOGIN_URL, null, {
      params: {
        grant_type: "password",
        client_id: process.env.SALESFORCE_CLIENT_ID,
        client_secret: process.env.SALESFORCE_CLIENT_SECRET,
        username: process.env.SALESFORCE_USERNAME,
        password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`,
      },
    });
    return response.data.access_token;
  }

  static async createAccount(req, res) {
    const { firstName, lastName, email } = req.body;

    try {
      const accessToken = await SalesforceController.getAccessToken();
      const existingContactResponse = await axios.get(
        `${process.env.SALESFORCE_INSTANCE_URL}/services/data/v61.0/query`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          params: {
            q: `SELECT Id FROM Contact WHERE Email = '${email}' LIMIT 1`,
          },
        }
      );

      if (
        existingContactResponse.data &&
        Array.isArray(existingContactResponse.data.records) &&
        existingContactResponse.data.records.length > 0
      ) {
        return res.status(409).json({ message: "Контакт существует." });
      }

      const accountResponse = await axios.post(
        `${process.env.SALESFORCE_INSTANCE_URL}/services/data/v61.0/sobjects/Account`,
        { Name: `${firstName} ${lastName}` },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const accountId = accountResponse.data.id;

      const contactResponse = await axios.post(
        `${process.env.SALESFORCE_INSTANCE_URL}/services/data/v61.0/sobjects/Contact`,
        {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          AccountId: accountId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.status(201).json({ accountId, contact: contactResponse.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAccount(req, res) {
    const { email } = req.params;
    try {
      const accessToken = await SalesforceController.getAccessToken();
      const query = `SELECT Id, FirstName, LastName, Email, AccountId 
         FROM Contact 
         WHERE Email = '${email}' LIMIT 1`;

      const contactResponse = await axios.get(
        `${process.env.SALESFORCE_INSTANCE_URL}/services/data/v61.0/query`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          params: {
            q: query,
          },
        }
      );

      if (contactResponse.data.records.length === 0) {
        return res.status(404).json({ message: "Контакт не найден." });
      }

      const contact = contactResponse.data.records[0];
      const accountId = contact.AccountId;

      const accountResponse = await axios.get(
        `${process.env.SALESFORCE_INSTANCE_URL}/services/data/v61.0/sobjects/Account/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({ contact, account: accountResponse.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = SalesforceController;
