import React from "react";
import { Field, useFormik, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const state = useSelector((state) => state);
  // console.log(state);
  // console.log(localStorage.getItem("token"));

  const onSubmit = async (values) => {
    await dispatch(login(values.email, values.password));
    navigate("/");
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  return (
    <>
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
            {formik.isSubmitting ? "Loading…" : "Login"}
          </Button>
        </FormikProvider>
      </form>
      <div className="mb-3">
        <Link className="link-underline-primary" to="/register">
          or Register if you don't have an account yet
        </Link>
      </div>
    </>
  );
};

export default Login;
