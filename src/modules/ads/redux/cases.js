import { createCases } from '../../../libs/redux-addons/redux-cases';

const { addAd, clearAds } = createCases({
  addAd: (state, { payload }) => ({ ...state, ads: [...state.ads, payload.ad] }),
  clearAds: state => ({ ...state, ads: [] }),
});

export {
  addAd,
  clearAds,
};
