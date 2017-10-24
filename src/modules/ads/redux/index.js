import { addAd, clearAds } from './actionCreators';
import * as actionTypes from './actionTypes';
import * as factories from './factories';
import * as selectors from './selectors';
import reducer from './reducer';

export {
  addAd,
  clearAds,
  actionTypes,
  factories,
  selectors,
  reducer,
};

export default { ads: reducer };
