const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // Проверка токена
    const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = verified;

    // Поиск пользователя в базе данных
    const user = await Users.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.status === false) {
      return res.status(403).json({ message: "User is blocked." });
    }

    next(); // Продолжаем к следующему обработчику
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
