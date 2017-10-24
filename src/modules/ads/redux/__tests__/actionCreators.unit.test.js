import { addAd, clearAds } from '../actionCreators';

describe('Ads.Redux.ActionCreators.addAd', () => {
  it('should return an ADD_AD action with an ad payload', () => {
    const ad = 1;

    expect(addAd(ad)).toMatchSnapshot();
  });
});

describe('Ads.Redux.ActionCreators.clearAds', () => {
  it('should return an CLEAR_ADS action', () => {
    expect(clearAds()).toMatchSnapshot();
  });
});
