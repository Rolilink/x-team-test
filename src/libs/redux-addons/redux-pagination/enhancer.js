import paginationFactory from './factory';

export default (state, initialPaginationState) =>
  ({ ...state, pagination: paginationFactory(initialPaginationState) });
