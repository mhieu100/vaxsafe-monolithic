import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './App.jsx';
import { store } from './redux/store.js';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
 
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
);