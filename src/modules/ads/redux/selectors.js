import { createSelector } from 'reselect';

export const getState = storeState => storeState.ads;

export const getAds = createSelector(
  getState,
  ({ ads }) => ads,
);

export const getLastAd = createSelector(
  getAds,
  ads => ads[ads.length - 1],
);
