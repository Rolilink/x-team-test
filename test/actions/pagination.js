/* global expect */
/* global sinon */
import * as actions from '../../src/app/js/actions';

const page = 1;
const limit = 10;
const skip = 20;

describe('PaginationActions#setPage', () => {
  it('should return action with type SET_PAGE and a page number', () => {
    const expectedAction = {
      type: actions.SET_PAGE,
      page,
    };

    expect(actions.setPage(page)).to.deep.equal(expectedAction);
  });
});

describe('PaginationActions#setLimit', () => {
  it('should return action with type SET_LIMIT and a limit number', () => {
    const expectedAction = {
      type: actions.SET_LIMIT,
      limit,
    };

    expect(actions.setLimit(limit)).to.deep.equal(expectedAction);
  });
});

describe('PaginationActions#setSkip', () => {
  it('should return action with type SET_SKIP and a skip number', () => {
    const expectedAction = {
      type: actions.SET_SKIP,
      skip,
    };

    expect(actions.setSkip(skip)).to.deep.equal(expectedAction);
  });
});
