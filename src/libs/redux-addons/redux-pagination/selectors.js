import { createSelector } from 'reselect';

export const getPaginationState = state => state.pagination;

export const getValuesToPaginate = (state, { key }) => state[key];

const getCurrentPage = createSelector(
  getPaginationState,
  ({ page }) => page,
);

export const getLimit = createSelector(
  getPaginationState,
  ({ limit }) => limit,
);

export const getNextPage = createSelector(
  getCurrentPage,
  page => page + 1,
);

export const getPreviousPage = createSelector(
  getCurrentPage,
  page => (page === 0 ? null : page - 1),
);

export const getBatchFromFirstPageToCurrent = createSelector(
  getValuesToPaginate,
  getCurrentPage,
  getLimit,
  (values, currentPage, limit) => values.slice(0, (currentPage - 1) * limit),
);
