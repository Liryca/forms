const { TemplateQuestions } = require("../models/associations");

class TemplateQuestionController {
  static async createQuestion(req, res) {
    const { title, description, type, visible, answers } = req.body;
    const templateId = req.params.templateId;

    try {
      const createdQuestion = await TemplateQuestions.create({
        title,
        description,
        type,
        visible,
        answers,
        templateId,
      });

      res.status(201).json(createdQuestion);
    } catch (error) {
      console.error("Ошибка при создании вопроса:", error);
      res.status(500).json({ message: "Ошибка при создании вопроса" });
    }
  }

  static async getAllQuestions(req, res) {
    const templateId = req.params.templateId;

    try {
      const questions = await TemplateQuestions.findAll({
        where: { templateId },
      });

      res.status(200).json(questions);
    } catch (error) {
      console.error("Ошибка при получении вопросов:", error);
      res.status(500).json({ message: "Ошибка при получении вопросов" });
    }
  }

  static async updateQuestion(req, res) {
    const questionId = req.params.questionId;
    const updatedData = req.body;

    try {
      const [updated] = await TemplateQuestions.update(updatedData, {
        where: { id: questionId },
      });

      if (updated) {
        const updatedQuestion = await TemplateQuestions.findByPk(questionId);
        return res.status(200).json(updatedQuestion);
      }

      res.status(404).json({ message: "Вопрос не найден" });
    } catch (error) {
      console.error("Ошибка при обновлении вопроса:", error);
      res.status(500).json({ message: "Ошибка при обновлении вопроса" });
    }
  }

  static async deleteQuestion(req, res) {
    const questionId = req.params.questionId;

    try {
      const deletedCount = await TemplateQuestions.destroy({
        where: { id: questionId },
      });

      if (deletedCount > 0) {
        res.status(204).send(); // Успешное удаление, без содержимого
      } else {
        res.status(404).json({ message: "Вопрос не найден" });
      }
    } catch (error) {
      console.error("Ошибка при удалении вопроса:", error);
      res.status(500).json({ message: "Ошибка при удалении вопроса" });
    }
  }
}

module.exports = TemplateQuestionController;
