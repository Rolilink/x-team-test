import adsStateFactory from '../factories';

const stateWithAds = {
  ads: [1, 2],
};

describe('Ads.Redux.Factories.adsState', () => {
  it(
    'should return an state with an empty ads array as default',
    () => (expect(adsStateFactory().ads).toMatchSnapshot()),
  );

  it(
    'should return a populated ads array when an object with ads is received as parameter',
    () => (expect(adsStateFactory(stateWithAds).ads).toEqual(stateWithAds.ads)),
  );
});
