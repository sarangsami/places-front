import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import { store } from "redux/store";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Providers from "Providers";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
