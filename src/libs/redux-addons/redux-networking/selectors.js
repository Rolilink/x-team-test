import { createSelector } from 'reselect';

export const getNetworkState = state => state.network;

export const getIsFetching = createSelector(
  getNetworkState,
  ({ isFetching }) => isFetching,
);

export const getError = createSelector(
  getNetworkState,
  ({ error }) => error,
);
