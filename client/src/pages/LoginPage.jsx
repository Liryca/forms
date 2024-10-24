import React from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values.email, values.password));
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
    <div className="container">
      <div className="mb-3">
        <Link className="link-underline-primary" to="/">
          Home
        </Link>
      </div>
      {formik.errors?.data && <ErrorMessage message={formik.errors?.data} />}
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
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
              "Login"
            )}
          </Button>
        </FormikProvider>
      </form>
      <div className="mt-3">
        <Link className="link-underline-primary " to="/register">
          or Register if you don't have an account yet
        </Link>
      </div>
    </div>
  );
};

export default Login;
