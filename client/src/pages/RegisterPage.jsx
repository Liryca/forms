import React from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { registration } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const INITIAL_VALUES = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await dispatch(
        registration(values.username, values.email, values.password)
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      formik.setErrors(error.response);
    } finally {
      formik.setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  return (
    <>
      {formik.errors.data && <ErrorMessage message={formik.errors.data} />}
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              required
            />
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
        <Link className="link-underline-primary mt-1 " to="/login">
          or Login
        </Link>
      </div>
    </>
  );
};

export default Register;
