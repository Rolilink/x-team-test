import { addAd, clearAds } from '../cases';

const state = {
  ads: [1, 2],
};

describe('Ads.Redux.Cases.addAd', () => {
  it('should add an ad at the end of the ads array', () => {
    const action = { payload: { ad: 3 } };

    expect(addAd(state, action).ads).toMatchSnapshot();
  });
});

describe('Ads.Redux.Cases.clearAds', () => {
  it('should add an ad at the end of the ads array', () => {
    const action = {};

    expect(clearAds(state, action).ads).toMatchSnapshot();
  });
});
