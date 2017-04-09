/* global expect */
import * as reducers from '../../src/app/js/reducers';
import * as actions from '../../src/app/js/actions';
const faces = [
  {
    text: '( ︶︿︶)',
  },
  {
    text: '( ﾟヮﾟ)',
  },
];

describe('reducers/faces', () => {
  it('should handle SET_FETCH_FACES', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.faces, isFetching: true };

    const action = {
      type: actions.SET_FETCH_FACES,
      isFetching: true,
    };

    expect(reducers.faces(initialState.faces, action)).to.be.deep.equal(expectedState);
  });

  it('should handle ADD_FACES', () => {
    const { initialState } = reducers;
    const expectedState = { ...initialState.faces, faces };

    const action = {
      type: actions.ADD_FACES,
      faces,
    };

    expect(reducers.faces(initialState.faces, action)).to.be.deep.equal(expectedState);
  });

  it('should handle default', () => {
    const { initialState } = reducers;
    const expectedState = initialState.faces;
    const action = {};

    expect(reducers.faces(initialState.faces, action)).to.be.deep.equal(expectedState);
  });
});
