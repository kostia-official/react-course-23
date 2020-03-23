import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './ThemeProvider';
import './index.scss';
import { App } from './components/App/App';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
