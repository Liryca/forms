import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Card, Button, Spinner } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import Select from "react-select";
import { ItemType } from "../../../constants";
import { typeQuestions } from "../../../constants";
import { renderInputField } from "../../../utils/renderInputField";
import { Field, useFormik, FormikProvider } from "formik";

const getInitialValue = (question) => {
  return {
    id: question.id,
    title: question.title,
    description: question.description,
    type: question.type,
    visible: question.visible,
  };
};

const DraggableQuestion = ({
  question,
  index,
  moveQuestion,
  onDelete,
  onSave,
}) => {
  const [, ref] = useDrag({
    type: ItemType.QUESTION,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.QUESTION,
    hover(item) {
      if (item.index !== index) {
        moveQuestion(item.index, index);
        item.index = index;
      }
    },
  });

  const INITIAL_VALUES = useMemo(() => getInitialValue(question), [question]);

  const onSubmit = async (fields, actions) => {
    await onSave(fields, question.id);
    actions.resetForm({ values: fields });
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  return (
    <Card className="mb-3" ref={(node) => ref(drop(node))}>
      <Card.Body>
        <>
          <div className="d-flex flex-row justify-content-around mb-3">
            <FontAwesomeIcon icon={faGripVertical} style={{ cursor: "grab" }} />
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(question.id)}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
              <Form.Group className="mb-3" controlId="title">
                <Field name="title">
                  {({ field }) => (
                    <Form.Control {...field} placeholder="Question Title" />
                  )}
                </Field>
              </Form.Group>

              <Form.Group className="mb-3" controlId="type">
                <Field name="type">
                  {({ field }) => (
                    <Select
                      {...field}
                      options={typeQuestions}
                      value={
                        typeQuestions.find(
                          (el) => el.value === formik.values.type
                        ) || null
                      }
                      onChange={(option) =>
                        formik.setFieldValue("type", option.value)
                      }
                    />
                  )}
                </Field>
              </Form.Group>

              <Form.Group className="mb-3" controlId="answer">
                {renderInputField(formik.values, formik.setFieldValue, index)}
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Field name="description">
                  {({ field }) => (
                    <Form.Control
                      as="textarea"
                      rows={2}
                      {...field}
                      placeholder="Description"
                    />
                  )}
                </Field>
              </Form.Group>

              <Form.Group className="mb-3" controlId="visible">
                <Field name="visible">
                  {({ field }) => (
                    <Form.Check
                      type="checkbox"
                      label="Display completed forms in the table"
                      {...field}
                      checked={formik.values.visible}
                      onChange={(event) =>
                        formik.setFieldValue("visible", event.target.checked)
                      }
                    />
                  )}
                </Field>
              </Form.Group>

              <Button
                disabled={!formik.dirty || formik.isSubmitting}
                type="submit"
                variant="primary"
              >
                {formik.isSubmitting ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  "Save"
                )}
              </Button>
            </FormikProvider>
          </form>
        </>
      </Card.Body>
    </Card>
  );
};

export default DraggableQuestion;
