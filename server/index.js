const express = require("express");
const sequelize = require("./db");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

const init = async () => {
  console.log("Connection has been established successfully.");
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

console.log(init);

init();
