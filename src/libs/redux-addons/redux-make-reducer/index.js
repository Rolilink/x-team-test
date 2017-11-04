import { handleActions } from 'redux-actions';

export default (cases, initialState, enhancer) => (
  handleActions(cases, enhancer(initialState))
);
