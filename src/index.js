import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Providers } from "./Providers";

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
