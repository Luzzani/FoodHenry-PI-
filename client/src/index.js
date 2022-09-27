import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const domain = process.env.REACT_APP_DOMAIN;
const clientId =
  process.env.REACT_APP_CLIENT_ID;
// const domain = process.env.REACT_APP_DOMAIN || "dev-mpyent2r.us.auth0.com";
// const clientId =
//   process.env.REACT_APP_CLIENT_ID || "kjdUz4W0Lj0QIucMR8Fij1DLQxjGOTJ9";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
