import {
  getState,
  getAds,
  getLastAd,
} from '../selectors';

const state = {
  ads: {
    ads: [1, 2, 3],
  },
};

describe('Ads.Redux.Selectors.getState', () => {
  it('should return the ads state', () => {
    expect(getState(state)).toMatchSnapshot();
  });
});

describe('Ads.Redux.Selectors.getAds', () => {
  it('should return the ads array', () => {
    expect(getAds(state)).toMatchSnapshot();
  });
});

describe('Ads.Redux.Selectors.getLastAd', () => {
  it('should return the last ad in the ads array', () => {
    expect(getLastAd(state)).toMatchSnapshot();
  });
});
