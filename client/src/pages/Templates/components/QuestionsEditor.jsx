import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableQuestion from "./DraggableQuestion";
import useTemplateQuestionsMutations from "../../../hook/useTemplateQuestionsMutation";

const QuestionsEditor = ({ questions, authorId, templateId }) => {
  const { updateMutation, createMutation, deleteMutation } =
    useTemplateQuestionsMutations();

  const {
    isPending: updateMutationIsPending,
    isError: updatedTemplateIsError,
  } = updateMutation;
  const { isPending: createMutationIsPending, isError: createMutationIsError } =
    createMutation;
  const { isPending: deleteMutationIsPending, isError: deleteMutationIsError } =
    deleteMutation;

  const [localQuestions, setLocalQuestions] = useState(questions);

  useEffect(() => {
    setLocalQuestions(questions);
  }, [questions]);

  const moveQuestion = (fromIndex, toIndex) => {
    const updatedQuestions = Array.from(localQuestions);
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    setLocalQuestions(updatedQuestions);
  };

  const isLoading =
    createMutationIsPending ||
    updateMutationIsPending ||
    deleteMutationIsPending;

  const updateQuestion = (question, questionId) => {
    updateMutation.mutate(
      { authorId, questionId, question },
      {
        onSuccess: () => {
          setLocalQuestions((prev) =>
            prev.map((elem) =>
              elem.id === questionId ? { ...elem, ...question } : elem
            )
          );
        },
        onError: (e) => {
          console.log("Error updating question:", e);
        },
      }
    );
  };

  const deleteQuestion = (id) => {
    deleteMutation.mutate(
      { authorId, questionId: id },
      {
        onSuccess: () => {
          setLocalQuestions((prev) => prev.filter((i) => i.id !== id));
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  const addDefaultQuestions = async () => {
    const newQuestion = {
      title: "question",
      description: "",
      type: "singleLine",
      visible: false,
      answers: [],
    };

    createMutation.mutate(
      { authorId, templateId, questions: newQuestion },
      {
        onSuccess: (data) => {
          setLocalQuestions((prevQuestions) => [...prevQuestions, data]);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {localQuestions?.map((question, index) => (
          <DraggableQuestion
            key={question.id}
            question={question}
            index={index}
            isLoading={isLoading}
            moveQuestion={moveQuestion}
            onSave={updateQuestion}
            onDelete={deleteQuestion}
          />
        ))}
        <Button onClick={addDefaultQuestions}>Add question</Button>
      </DndProvider>
    </>
  );
};

export default QuestionsEditor;
