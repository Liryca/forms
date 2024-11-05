import React from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { registration } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";
import { RegisterScheme } from "../validationsSchemes/RegisterScheme";
import ErrorText from "../components/ErrorText";

const INITIAL_VALUES = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      dispatch(
        registration(
          values.username,
          values.firstName,
          values.lastName,
          values.email,
          values.password
        )
      );
      navigate("/login");
    } catch (error) {
      formik.setErrors(error.response);
    } finally {
      formik.setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: RegisterScheme,
    onSubmit,
  });

  return (
    <div className="container">
      <div className="mb-3">
        <Link className="link-underline-primary" to="/">
          Home
        </Link>
      </div>
      {formik.errors.data && <ErrorMessage message={formik.errors.data} />}
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nick Name
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              required
            />
            <ErrorText name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <Field
              name="firstName"
              type="text"
              className="form-control"
              required
            />
            <ErrorText name="firstName" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <Field
              name="lastName"
              type="text"
              className="form-control"
              required
            />
            <ErrorText name="lastName" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="form-control"
              required
            />
            <ErrorText name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="primary"
          >
            {formik.isSubmitting ? (
              <Spinner animation="border" role="status" />
            ) : (
              "Register"
            )}
          </Button>
        </FormikProvider>
      </form>
      <div className="mt-3">
        <Link className="link-underline-primary mt-1" to="/login">
          or Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
