import React, { useMemo, useState, useEffect } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { Header } from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import UsersService from "../services/UserService";
import { useParams } from "react-router-dom";
import SalesforceServices from "../services/SalesforceServices";
import SpinerLoader from "../components/Spiner";
import ErrorText from "../components/ErrorText";
import { SalesforceAccountScheme } from "../validationsSchemes/SalesforceAccountScheme";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Message } from "../components/Message";
import { Spinner } from "react-bootstrap";

const CreateSalesforceAccount = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["salesforce", userId],
    queryFn: () => UsersService.getUseInfoById(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: ({ firstName, lastName, email }) => {
      return SalesforceServices.createAccount({ firstName, lastName, email });
    },
  });

  const onSubmit = (fields, actions) =>
    mutation.mutate(fields, {
      onSuccess: (response) => {
        console.log(response);
        actions.resetForm({ values: fields });
        setMessage("Account and contact successfully created");
      },
      onError: (e) => {
        actions.setSubmitting(false);
        setError(e);
      },
    });

  const formik = useFormik({
    validationSchema: SalesforceAccountScheme,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (data) {
      const newInitialValues = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
      };
      formik.setValues(newInitialValues);
    }
  }, [data]);

  if (isLoading) {
    return <SpinerLoader />;
  }

  return (
    <>
      <Header />
      <div className="container">
        <Link className="mb-3" to={`/user/${userId}`}>
          Templates
        </Link>
        <h2 className="mt-3">Create Salesforce Account</h2>
        {message && <Message message={message} />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !isError && data && (
          <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
              <div className="form-group mb-3">
                <label htmlFor="firstName">First name</label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorText name="firstName" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorText name="lastName" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorText name="email" />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting || !formik.dirty}
              >
                {formik.isSubmitting ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  "Submit"
                )}
              </button>
            </FormikProvider>
          </form>
        )}
      </div>
    </>
  );
};

export default CreateSalesforceAccount;
