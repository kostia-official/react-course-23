import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { ThemeProvider } from "./ThemeProvider";

import "./index.scss";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
