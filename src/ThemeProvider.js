import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

export const ThemeProvider = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: teal,
      secondary: teal
    }
  });

  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MaterialThemeProvider>
  );
};
