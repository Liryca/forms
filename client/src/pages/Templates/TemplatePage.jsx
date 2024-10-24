import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Tabs, Tab, Stack } from "react-bootstrap";
import GeneralSettings from "./components/GeneralSettigs";
import UsersService from "../../services/UserService";
import useTemplateMutations from "../../hook/useTemplatesMutation";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import QuestionsEditor from "./components/QuestionsEditor";
import { useSelector } from "react-redux";
import TemplateServices from "../../services/TemplateServices";
import SpinerLoader from "../../components/Spiner";
import TemplateQuestionsService from "../../services/TemplateQuestionsService";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";

// const renderTooltip = (props) => (
//   <Tooltip id="tooltip-right" {...props}>
//     Please save your settings to create questions.
//   </Tooltip>
// );

const TemplatePage = () => {
  const { templateId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const templateMutations = useTemplateMutations();
  const navigate = useNavigate();

  const {
    data: users,
    isLoading: loadingUsers,
    isError: isErrorUsers,
    isFetching: isFetchingUsers,
  } = useQuery({
    queryKey: ["userList"],
    queryFn: UsersService.getAllUsers,
  });

  const {
    data: template,
    isLoading: loadingTemplate,
    isError: isErrorTemplate,
    isFetching: isFetchingTemplate,
  } = useQuery({
    queryKey: ["template", user?.id, templateId],
    queryFn: () => TemplateServices.getTemplate(user?.id, templateId),
    enabled: !!user?.id && !!templateId,
  });

  const {
    data: questions,
    isError: isErrorQuestions,
    isLoading: isLoadingQuestions,
    isFetching: isFetchingQuestions,
  } = useQuery({
    queryKey: ["questions", templateId],
    queryFn: () =>
      TemplateQuestionsService.getAllQuestions(user.id, template.id),
    enabled: !!templateId,
  });

  const hasLoadingQuestions = isLoadingQuestions || isFetchingQuestions;
  const hasLoadingTemplates =
    loadingTemplate || loadingUsers || isFetchingTemplate || isFetchingUsers;
  const hasError = isErrorUsers || isErrorTemplate || isErrorQuestions;

  const onSaveTemplate = (updatedTemplate) => {
    !templateId
      ? templateMutations.createMutation.mutate(updatedTemplate, {
          onSuccess: (data) => navigate(`/templates/${data.id}`),
        })
      : templateMutations.updateMutation.mutate(
          {
            authorId: user.id,
            templateId,
            updatedTemplate,
          },
          {
            onSuccess: (data) => navigate(`/templates/${data.id}`),
          }
        );
  };
  if (hasLoadingTemplates || hasLoadingQuestions) {
    return <SpinerLoader />;
  }

  if (hasError) {
    return <ErrorMessage message={"Error recive template"} />;
  }

  return (
    <>
      <Header />
      <Container>
        <Stack gap={3}>
          <Link className="link-underline-primary " to="/user">
            Templates
          </Link>
          <h3>{templateId ? "Edit template" : "Create new template"}</h3>
          <Tabs defaultActiveKey="general" id="template-tabs">
            <Tab eventKey="general" title="Settings">
              <GeneralSettings
                template={template}
                users={users}
                onSave={onSaveTemplate}
              />
            </Tab>

            <Tab disabled={!templateId} eventKey="questions" title="Questions">
              <QuestionsEditor
                questions={questions}
                authorId={user.id}
                templateId={template?.id}
              />
            </Tab>
          </Tabs>
        </Stack>
      </Container>
    </>
  );
};

export default TemplatePage;
