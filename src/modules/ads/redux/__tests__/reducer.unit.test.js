import reducer from '../reducer';
import { ADD_AD, CLEAR_ADS } from '../actionTypes';

const state = {
  ads: [1, 2],
};

describe('Ads.Redux.Reducer', () => {
  it(
    'should add an ad to the ads array when dispatching an ADD_AD action',
    () => {
      const action = { type: ADD_AD, payload: { ad: 3 } };
      const updatedState = reducer(state, action);

      expect(updatedState.ads).toMatchSnapshot();
    },
  );
  it(
    'should clear the ads array when dispatching an CLEAR_ADS action',
    () => {
      const action = { type: CLEAR_ADS };
      const updatedState = reducer(state, action);

      expect(updatedState.ads).toMatchSnapshot();
    },
  );
});
