import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { app } from './reducers';

// Creates Store
const store = createStore(app, applyMiddleware(thunk, logger));

export default store;
