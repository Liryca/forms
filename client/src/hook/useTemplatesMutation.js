import TemplateServices from "../services/TemplateServices";
import { queryClient } from "../index";
import { useMutation } from "@tanstack/react-query";

export const useTemplateMutations = () => {
  const createMutation = useMutation({
    mutationFn: (newTemplate) => {
      return TemplateServices.createTemplate(newTemplate);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("templates");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ authorId, templateId, updatedTemplate }) => {
      TemplateServices.updateTemplate(authorId, templateId, updatedTemplate);
    },

    onSuccess: () => {
      queryClient.invalidateQueries("templates");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ authorId, templateId }) =>
      TemplateServices.deleteTemplate(authorId, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries("templates");
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useTemplateMutations;
