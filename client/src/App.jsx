import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
