import { handleActions } from 'redux-actions';
import { ADD_AD, CLEAR_ADS } from './actionTypes';
import { addAd, clearAds } from './cases';
import stateFactory from './factories';

export default handleActions(
  {
    [ADD_AD]: addAd,
    [CLEAR_ADS]: clearAds,
  },
  stateFactory(),
);
