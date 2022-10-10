import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { store, Persistor } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
//import dotenv from "dotenv";
//dotenv.config();

// require("dotenv").config();

const { CLIENT_ID } = process.env;
console.log(CLIENT_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="359778256290-m4jop4som96e368ak8tgpsp0dev5qpq8.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
