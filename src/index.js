import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/AppHooks';
import { ThemeProvider } from './ThemeProvider';
import { Router } from 'react-router-dom';
import './index.scss';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
