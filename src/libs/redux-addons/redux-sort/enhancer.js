import sortingFactory from './factory';

export default (state, initialSortingState) =>
  ({ ...state, sort: sortingFactory(initialSortingState) });
