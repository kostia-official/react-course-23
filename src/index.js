import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { ThemeProvider } from './ThemeProvider';
import { Router } from 'react-router-dom';
import './index.scss';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PERSIST } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import localStorage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const history = createBrowserHistory();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST]
    }
  })
});
const persistor = persistStore(store);

ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('root')
);
