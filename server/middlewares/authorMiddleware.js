const { Templates } = require("../models/associations");

const authorMiddleware = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const userId = req.user.id;

    if (!authorId) {
      return res
        .status(400)
        .json({ message: "Идентификатор автора не указан." });
    }

    // Получение шаблонов по authorId
    const templates = await Templates.findAll({
      where: { authorId: authorId },
    });

    if (templates.length === 0) {
      return res.status(404).send("У автора нет шаблонов.");
    }

    if (templates[0].authorId !== userId) {
      return res.status(403).json({ message: "Доступ запрещен." });
    }

    next();
  } catch (error) {
    console.error("Ошибка в authorMiddleware:", error); // Логируем ошибку для разработки
    return res.status(500).json({ message: "Произошла ошибка на сервере." });
  }
};

module.exports = authorMiddleware;
