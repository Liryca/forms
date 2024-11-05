const { Users } = require("../models/associations");

const authorOrAdminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const authorId = req.params.authorId;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (user.id === parseInt(authorId, 10) || user.role === "admin") {
      return next();
    }

    return res.status(403).json({ message: "Доступ запрещён" });
  } catch (error) {
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = authorOrAdminMiddleware;
