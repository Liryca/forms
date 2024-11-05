import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { Tab, Nav, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import useTemplateMutations from "../hook/useTemplatesMutation";
import TemplateServices from "../services/TemplateServices";
import { ErrorMessage } from "../components/ErrorMessage";
import SpinerLoader from "../components/Spiner";
import { useParams } from "react-router-dom";

const forms = [];

const UserPage = () => {
  const { user } = useSelector((state) => state.auth);
  const mutations = useTemplateMutations();
  const { userId } = useParams();

  const {
    data: templates = [],
    isLoading: loadingTemplates,
    isError: isErrorTemplates,
  } = useQuery({
    queryKey: ["templates", userId],
    queryFn: async () => await TemplateServices.getTemplatesByAuthor(userId),
    enabled: !!userId,
  });

  const deleteTemplate = (authorId, templateId) =>
    mutations.deleteMutation.mutate({ authorId, templateId });

  if (loadingTemplates) return <SpinerLoader />;

  return (
    <>
      <Header />
      <Container>
        <Stack direction="vertical" gap={3} className="mb-3">
          {user.role === "admin" ? (
            <h3>You are viewing the user account with id {userId}</h3>
          ) : (
            <h3>Hello, {user.username}</h3>
          )}
          <Link to={`/user/${userId}/templates/new`}>Create template</Link>
          <Link to={`/user/${userId}/salesforce`}>
            Create salesforceAccount
          </Link>
        </Stack>

        {!templates.length && <p>You haven't created any templates</p>}
        {isErrorTemplates && (
          <ErrorMessage message={"Error receiving templates"} />
        )}

        <Tab.Container defaultActiveKey="templates">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="templates">Шаблоны</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="forms">Заполненные формы</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="templates">
              {templates.length !== 0 && (
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map((template, index) => (
                      <tr key={template.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/user/${userId}/templates/${template.id}`}>
                            {template.title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            onClick={() => deleteTemplate(user.id, template.id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="forms">
              {!forms.length && <p>You haven't forms</p>}
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {forms?.map((form) => (
                    <tr key={form.id}>
                      <td>{form.submittedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
};
export default UserPage;
