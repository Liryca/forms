const express = require("express");
const userRoutes = require("./routes/users");
require("dotenv").config();
const { sequelize } = require("./db");
const Users = require("./models/Users");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

// Инициализация базы данных и сервера
const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync(); // Синхронизация с БД
    console.log("Models have been synced.");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

init();
