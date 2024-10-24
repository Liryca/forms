import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const CheckboxQuestion = ({ question, onUpdate, index }) => {
  const [answerOptions, setAnswerOptions] = useState(question.answers || [""]);

  const handleOptionChange = (event, optionIndex) => {
    const newOptions = [...answerOptions];
    newOptions[optionIndex] = event.target.value;
    setAnswerOptions(newOptions);
    onUpdate("answers", newOptions);
  };

  const addAnswerOption = () => {
    setAnswerOptions([...answerOptions, ""]);
  };

  return (
    <>
      {answerOptions.map((option, idx) => (
        <>
          <Form.Control
            key={idx}
            type="text"
            placeholder="Enter answer option"
            value={option}
            onChange={(event) => handleOptionChange(event, idx)}
          />
        </>
      ))}
      <Button variant="link" onClick={addAnswerOption}>
        Add answer option
      </Button>
    </>
  );
};

export default CheckboxQuestion;
