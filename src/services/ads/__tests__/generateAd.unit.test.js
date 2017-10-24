import generateAd from '../';

describe('Services.Ads.generateAd', () => {
  it(
    'should return an id by default',
    () => expect(generateAd()).toBeDefined(),
  );

  it(
    'should return and id different to the id passed in the parameter',
    () => expect(generateAd(1)).not.toBe(1),
  );
});
