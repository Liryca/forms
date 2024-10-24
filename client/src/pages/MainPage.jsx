import React from "react";
import { Header } from "../components/Header";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { ErrorMessage } from "../components/ErrorMessage";
import { useSelector } from "react-redux";

const templates = [
  {
    id: 1,
    title: "Шаблон 1",
    description: "Описание шаблона 1",
    author: "Автор 1",
    image: "url-изображения-1",
  },
  {
    id: 2,
    title: "Шаблон 2",
    description: "Описание шаблона 2",
    author: "Автор 2",
    image: "url-изображения-2",
  },
];

const popularTemplates = [
  { id: 1, title: "Популярный шаблон 1", filledForms: 150 },
  { id: 2, title: "Популярный шаблон 2", filledForms: 120 },
];

const tags = ["HTML", "CSS", "JavaScript", "React", "Bootstrap"];

const MainPage = () => {
  const error = useSelector((state) => state.auth.authError);

  return (
    <>
      <Header />
      <Container>
        {error && <ErrorMessage message={error} />}
        <section className="mt-4">
          <h2>Последние шаблоны</h2>
          <Row>
            {templates.map((template) => (
              <Col md={4} key={template.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={template.image} />
                  <Card.Body>
                    <Card.Title>{template.title}</Card.Title>
                    <Card.Text>{template.description}</Card.Text>
                    <Card.Text>
                      Автор: <strong>{template.author}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mt-4">
          <h2>Самые популярные шаблоны</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Название</th>
                <th>Заполненные формы</th>
              </tr>
            </thead>
            <tbody>
              {popularTemplates.map((template) => (
                <tr key={template.id}>
                  <td>{template.title}</td>
                  <td>{template.filledForms}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        <section className="mt-4">
          <h2>Облако тегов</h2>
          <div>
            {tags.map((tag, index) => (
              <Badge pill variant="primary" className="mr-2" key={index}>
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
};

export default MainPage;
