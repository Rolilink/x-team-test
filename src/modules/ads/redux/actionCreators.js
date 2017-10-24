import { createAction } from 'redux-actions';
import { ADD_AD, CLEAR_ADS } from './actionTypes';

export const addAd = createAction(ADD_AD, ad => ({ ad }));
export const clearAds = createAction(CLEAR_ADS);
