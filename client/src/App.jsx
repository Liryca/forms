import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
