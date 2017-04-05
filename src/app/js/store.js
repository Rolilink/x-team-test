import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Creates Store
const store = createStore(() => {}, applyMiddleware(thunk));

export default store;
