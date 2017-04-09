/* global expect */
/* global sinon */
import * as helpers from '../src/app/js/helpers';

describe('AdsHelpers#createRandomAdID', () => {
  it('should return an id', () => {
    expect(helpers.createRandomAdID()).to.be.a('number');
  });
});
