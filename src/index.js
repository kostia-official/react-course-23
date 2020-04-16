import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { ThemeProvider } from './ThemeProvider';
import { Router } from 'react-router-dom';
import './index.scss';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const history = createBrowserHistory();

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
