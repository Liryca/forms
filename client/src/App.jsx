import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Stack } from "react-bootstrap";
import PrivateRoute from "./hoc/PrivetRoute";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import TemplatePage from "./pages/Templates/TemplatePage";
import NotFoundPage from "./pages/NotFoundPage";
import { checkAuth } from "./store/actions/authActions";
import "./App.css";
import SpinerLoader from "./components/Spiner";

const App = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await dispatch(checkAuth());
        } catch (error) {
          setError("Authentication error");
        }
      }
      setLoading(false);
    };

    authenticate();
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <Stack>
          <SpinerLoader />
        </Stack>
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage error={error} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<AdminPage />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute
              element={<UserPage />}
              allowedRoles={["user", "admin"]}
            />
          }
        />
        {/* <Route
          path="/templates"
          element={
            <PrivateRoute
              element={<TemplatesPage />}
              allowedRoles={["user", "admin"]}
            />
          }
        /> */}
        <Route
          path="/templates/:templateId"
          element={
            <PrivateRoute
              element={<TemplatePage />}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        <Route
          path="/templates/new"
          element={
            <PrivateRoute
              element={<TemplatePage />}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
