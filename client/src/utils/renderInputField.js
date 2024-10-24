import { Form } from "react-bootstrap";
import CheckboxQuestion from "../pages/Templates/components/CheckboxQuestion";

export const renderInputField = (question, onUpdate, index) => {
  switch (question.type) {
    case "singleLine":
      return <Form.Control readOnly type="text" value="Short answer" />;
    case "multiLine":
      return (
        <Form.Control as="textarea" rows={3} readOnly value="Detailed answer" />
      );
    case "positiveInteger":
      return (
        <Form.Control type="text" readOnly value="Answer will be an integer" />
      );
    case "checkbox":
      return (
        <CheckboxQuestion
          question={question}
          onUpdate={onUpdate}
          index={index}
        />
      );
    default:
      return null;
  }
};
