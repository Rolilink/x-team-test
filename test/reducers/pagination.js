/* global expect */
import * as reducers from '../../src/app/js/reducers';
import * as actions from '../../src/app/js/actions';

describe('reducers/pagination', () => {
  it('should handle SET_PAGE', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.pagination, page: 1 };

    const action = {
      type: actions.SET_PAGE,
      page: 1,
    };

    expect(reducers.pagination(initialState.pagination, action)).to.be.deep.equal(expectedState);
  });

  it('should handle SET_LIMIT', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.pagination, limit: 10 };

    const action = {
      type: actions.SET_LIMIT,
      limit: 10,
    };

    expect(reducers.pagination(initialState.pagination, action)).to.be.deep.equal(expectedState);
  });

  it('should handle default', () => {
    const { initialState } = reducers;
    const expectedState = initialState.pagination;
    const action = {};

    expect(reducers.pagination(initialState.pagination, action)).to.be.deep.equal(expectedState);
  });
});
