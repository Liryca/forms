const { Templates, Users, TemplateUser } = require("../models/associations");

class TemplateController {
  static async getAllTemplates(req, res) {
    try {
      const templates = await Templates.findAll({
        include: [
          {
            model: Users,
            as: "author",
            attributes: ["id", "username"],
          },
          {
            model: Users,
            as: "users",
            attributes: ["id", "email"],
          },
        ],
      });
      res.json(templates);
    } catch (error) {
      console.error(error);
      res.status(500).send("Ошибка получения шаблонов");
    }
  }

  static async getTemplatesByAuthor(req, res) {
    const { authorId } = req.params;

    const userId = req.user.id;

    // if (userId !== Number(authorId)) {
    //   return res.status(403).send("Доступ запрещен.");
    // }

    try {
      const templates = await Templates.findAll({
        where: { authorId },
        include: [
          {
            model: Users,
            as: "author",
            attributes: ["id", "username"],
          },
          {
            model: Users,
            as: "users",
            attributes: ["id", "email"],
          },
        ],
      });

      // if (templates.length === 0) {
      //   return res.status(404).send("Шаблоны не найдены для этого автора");
      // }

      res.json(templates);
    } catch (error) {
      console.error(error);
      res.status(500).send("Ошибка получения шаблонов");
    }
  }

  static async getTemplateById(req, res) {
    const { templateId } = req.params;

    try {
      const template = await Templates.findOne({
        where: { id: templateId },
        include: [
          {
            model: Users,
            as: "author",
            attributes: ["id", "username"],
          },
          {
            model: Users,
            as: "users",
            attributes: ["id", "email"],
          },
        ],
      });

      if (!template) {
        return res.status(404).send("Шаблон не найден");
      }

      res.json(template);
    } catch (error) {
      console.error(error);
      res.status(500).send("Ошибка получения шаблона");
    }
  }

  static async createTemplate(req, res) {
    const authorId = req.user.id;
    const newTemplate = new Templates({ authorId, ...req.body });

    try {
      await newTemplate.save();
      if (req.body.users && Array.isArray(req.body.users)) {
        await Promise.all(
          req.body.users.map((user) =>
            TemplateUser.create({ userId: user.id, templateId: newTemplate.id })
          )
        );
      }

      res.status(201).json(newTemplate);
    } catch (error) {
      console.error(error);
      res.status(400).send("Ошибка создания шаблона");
    }
  }

  static async updateTemplate(req, res) {
    const { templateId } = req.params;

    try {
      const template = await Templates.findByPk(templateId);
      if (!template) {
        return res.status(404).send("Шаблон не найден");
      }

      await template.update(req.body);

      await TemplateUser.destroy({ where: { templateId: templateId } });

      if (req.body.users && Array.isArray(req.body.users)) {
        await Promise.all(
          req.body.users.map((user) =>
            TemplateUser.create({ userId: user.id, templateId: template.id })
          )
        );
      }

      res.status(200).json(template);
    } catch (error) {
      console.error("Ошибка при обновлении шаблона:", error);
      res.status(500).send("Ошибка при обновлении шаблона");
    }
  }

  static async deleteTemplate(req, res) {
    const { templateId } = req.params;

    try {
      await TemplateUser.destroy({ where: { templateId: templateId } });

      const template = await Templates.destroy({ where: { id: templateId } });
      if (!template) {
        return res.status(404).send("Шаблон не найден");
      }

      res.send("Шаблон удален");
    } catch (error) {
      console.log(error);
      res.status(500).json("Ошибка удаления шаблона");
    }
  }
}

module.exports = TemplateController;
