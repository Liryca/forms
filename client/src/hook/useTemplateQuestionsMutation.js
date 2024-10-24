import TemplateQuestionsService from "../services/TemplateQuestionsService";
import { useMutation } from "@tanstack/react-query";

export const useTemplateQuestionsMutations = () => {
  const createMutation = useMutation({
    mutationFn: ({ authorId, templateId, questions }) => {
      return TemplateQuestionsService.createQuestion(
        authorId,
        templateId,
        questions
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ authorId, questionId, question }) => {
      return TemplateQuestionsService.updateQuestion(
        authorId,
        questionId,
        question
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ authorId, questionId }) =>
      TemplateQuestionsService.deleteQuestion(authorId, questionId),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useTemplateQuestionsMutations;
