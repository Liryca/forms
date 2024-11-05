import * as Yup from "yup";

export const RegisterScheme = Yup.object().shape({
  username: Yup.string().required("Nick name name is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .max(80, "Email must not exceed 80 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email does not meet Salesforce requirements"
    ),
});
