import { ErrorMessage } from "formik";

const ErrorText = ({ name }) => (
  <ErrorMessage name={name} component="div" className="text-danger" />
);

export default ErrorText;
