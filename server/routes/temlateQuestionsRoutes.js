const express = require("express");
const router = express.Router();
const TemplateQuestionController = require("../controllers/TemlateQuestionsController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const authorMiddleware = require("../middlewares/authorMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
  "/author/:authorId/template/:templateId/questions",
  TemplateQuestionController.createQuestion
);
router.get(
  "/author/:authorId/template/:templateId/questions",
  TemplateQuestionController.getAllQuestions
);
router.put(
  "/author/:authorId/template/questions/question/:questionId",
  TemplateQuestionController.updateQuestion
);
router.delete(
  "/author/:authorId/template/questions/question/:questionId",
  TemplateQuestionController.deleteQuestion
);

module.exports = router;
