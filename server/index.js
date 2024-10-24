const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const templatesRoutes = require("./routes/templatesRoutes");
const templateQuestionsRoutes = require("./routes/temlateQuestionsRoutes");

require("dotenv").config();
const { sequelize } = require("./db");
const cors = require("cors");

const {
  Users,
  Templates,
  TemplateUser,
  TemplateQuestions,
} = require("./models/associations");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/templates", templateQuestionsRoutes);

const port = process.env.PORT || 5000;

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
    console.error("Error initializing database:", error);
  }
};

init();

// async function syncDatabase() {
//   try {
//     // await Users.sync({ alter: true });
//     // await Templates.sync({ alter: true });
//     // await TemplateUser.sync({ alter: true });
//     await TemplateQuestions.sync({ alter: true });

//     console.log("Таблица templates успешно создана или обновлена.");
//   } catch (error) {
//     console.error("Ошибка синхронизации:", error);
//   }
// }

// syncDatabase();
