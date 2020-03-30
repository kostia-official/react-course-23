import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { ThemeProvider } from "./ThemeProvider";

import "./index.scss";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
