/* global expect */
import * as reducers from '../../src/app/js/reducers';
import * as actions from '../../src/app/js/actions';

describe('reducers/sort', () => {
  it('should handle SET_SORT', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.sort, field: 'size' };

    const action = {
      type: actions.SET_SORT,
      field: 'size',
    };

    expect(reducers.sort(initialState.sort, action)).to.be.deep.equal(expectedState);
  });

  it('should handle default', () => {
    const { initialState } = reducers;
    const expectedState = initialState.sort;
    const action = {};

    expect(reducers.sort(initialState.sort, action)).to.be.deep.equal(expectedState);
  });
});
