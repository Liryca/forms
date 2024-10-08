import React from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { registration } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const INITIAL_VALUES = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await dispatch(
      registration(values.username, values.email, values.password)
    );
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  return (
    <>
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
          <Button type="submit" variant="primary">
            Register
          </Button>
        </FormikProvider>
      </form>
      <Link className="link-underline-primary" to="/login">
        or Login
      </Link>
    </>
  );
};

export default Register;
