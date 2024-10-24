import $api from "../api";

// router.post(
//   "/templates/author/:authorId/template/:templateId/questions",
//   TemplateQuestionController.createQuestion
// );
// router.get(
//   "/templates/author/:authorId/template/:templateId/questions",
//   TemplateQuestionController.getAllQuestions
// );
// router.put(
//   "/templates/author/:authorId/template/questions/question/:questionId",
//   TemplateQuestionController.updateQuestion
// );
// router.delete(
//   "/templates/author/:authorId/template/questions/question/:questionId",
//   TemplateQuestionController.deleteQuestion
// );

class TemplateQuestionsService {
  static async createQuestion(authorId, templateId, question) {
    try {
      const response = await $api.post(
        `/api/templates/author/${authorId}/template/${templateId}/questions`,

        question
      );
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllQuestions(authorId, templateId) {
    try {
      const response = await $api.get(
        `api/templates/author/${authorId}/template/${templateId}/questions`
      );

      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateQuestion(authorId, questionId, question) {
    try {
      const response = await $api.put(
        `api/templates/author/${authorId}/template/questions/question/${questionId}`,
        question
      );

      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuestion(authorId, questionId) {
    try {
      const response = await $api.delete(
        `api/templates/author/${authorId}/template/questions/question/${questionId}`
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default TemplateQuestionsService;
