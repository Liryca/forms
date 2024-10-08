import Alert from "react-bootstrap/Alert";

export const ErrorMessage = ({ message }) => {
  if (message) {
    return (
      <Alert dismissible variant="danger">
        {message}
      </Alert>
    );
  }
};
