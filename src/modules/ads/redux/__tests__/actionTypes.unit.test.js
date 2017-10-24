import { ADD_AD, CLEAR_ADS } from '../actionTypes';

describe('Ads.Redux.ActionTypes', () => {
  it('should contain ADD_AD actionType', () => expect(ADD_AD).toMatchSnapshot());
  it('should contain CLEAR_ADS actionType', () => expect(CLEAR_ADS).toMatchSnapshot());
});
