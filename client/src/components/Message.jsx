import Alert from "react-bootstrap/Alert";

export const Message = ({ message }) => {
  if (message) {
    return (
      <Alert dismissible variant=" alert-success">
        {message}
      </Alert>
    );
  }
};
