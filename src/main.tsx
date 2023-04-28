import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./context/AppContext.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
