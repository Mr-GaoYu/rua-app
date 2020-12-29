import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadDevTools from "./dev-tools/load";
import "./index.css";



loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root") as HTMLElement
  );
});
