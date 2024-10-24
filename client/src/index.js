import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const firebaseConfig = {
  apiKey: "AIzaSyBlBhrm5rWTS6FzMZfiG0jgvG7lposVEu4",
  authDomain: "forms-664c7.firebaseapp.com",
  projectId: "forms-664c7",
  storageBucket: "forms-664c7.appspot.com",
  messagingSenderId: "736134639277",
  appId: "1:736134639277:web:a70bae5552d64c0a702024",
  measurementId: "G-7LDC3DTRVL",
};
const app = initializeApp(firebaseConfig);

// Получение экземпляра Storage
export const storage = getStorage(app);

export const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <App />
    </QueryClientProvider>
  </Provider>
);
