import { createSelector } from 'reselect';

const getArrayPositionsForPage = (page, limit) => ({
  start: (page - 1) * limit,
  end: page * limit,
});

const getPaginationState = state => state.pagination;

const getValuesToPaginate = (state, { key }) => state[key];

export default () => {
  const getCurrentPage = createSelector(
    getPaginationState,
    ({ page }) => page,
  );

  const getLimit = createSelector(
    getPaginationState,
    ({ limit }) => limit,
  );

  const getNextPage = createSelector(
    getCurrentPage,
    page => page + 1,
  );

  const getPreviousPage = createSelector(
    getCurrentPage,
    page => page - 1,
  );

  const getBatchFromFirstPageToCurrent = createSelector(
    getValuesToPaginate,
    getCurrentPage,
    getLimit,
    (values, currentPage, limit) => {
      const { end } = getArrayPositionsForPage(currentPage, limit);

      return values.slice(0, end);
    });

  return {
    getPaginationState,
    getValuesToPaginate,
    getCurrentPage,
    getLimit,
    getNextPage,
    getPreviousPage,
    getBatchFromFirstPageToCurrent,
  };
};
