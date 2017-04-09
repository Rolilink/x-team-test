/* global expect */
/* global sinon */
import * as actions from '../../src/app/js/actions';

const field = 'size';

describe('SortActions#setSort', () => {
  it('should return action with type SET_SORT with a sort field', () => {
    const expectedAction = {
      type: actions.SET_SORT,
      field,
    };

    expect(actions.setSort(field)).to.deep.equal(expectedAction);
  });
});
