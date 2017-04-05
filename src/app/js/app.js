import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';
import fetchServer from './components/api';

window.fetchServer = fetchServer; // #TODO: Remove this line

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
