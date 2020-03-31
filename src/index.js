import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { ThemeProvider } from "./ThemeProvider";

import "./index.scss";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <UserProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);
