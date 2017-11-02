import { createSelector } from 'reselect';

const getNetworkState = state => state.network;

export default () => {
  const getIsFetching = createSelector(
    getNetworkState,
    ({ isFetching }) => isFetching,
  );

  const getError = createSelector(
    getNetworkState,
    ({ error }) => error,
  );

  return {
    getNetworkState,
    getIsFetching,
    getError,
  };
};
