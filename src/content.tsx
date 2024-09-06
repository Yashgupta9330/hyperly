import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ContentRouter from "./contentRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";


const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContentRouter />
    </Provider>
  </React.StrictMode>
);
