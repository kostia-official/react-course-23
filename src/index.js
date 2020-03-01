import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: teal
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
