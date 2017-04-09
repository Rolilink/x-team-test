/* global expect */
import * as reducers from '../../src/app/js/reducers';
import * as actions from '../../src/app/js/actions';

describe('reducers/ads', () => {
  it('should handle ADD_AD', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.ads, ads: [23] };
    const action = {
      type: actions.ADD_AD,
      ad: 23,
    };

    expect(reducers.ads(initialState.ads, action)).to.be.deep.equal(expectedState);
  });

  it('should handle default', () => {
    const { initialState } = reducers;
    const expectedState = initialState.ads;
    const action = {};

    expect(reducers.ads(initialState.ads, action)).to.be.deep.equal(expectedState);
  });
});
