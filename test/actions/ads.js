/* global expect */
/* global sinon */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as helpers from '../../src/app/js/helpers';
import * as actions from '../../src/app/js/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('AdsActions#addAd', () => {
  it('should return action with type ADD_AD and an ad id', () => {
    const adId = 23;
    const expectedAction = {
      type: actions.ADD_AD,
      ad: adId,
    };

    expect(actions.addAd(adId)).to.deep.equal(expectedAction);
  });
});

describe('AdsActions#generateAd', () => {
  const adId = 23;
  const expectedAction = {
    type: actions.ADD_AD,
    ad: adId,
  };

  afterEach(() => {
    helpers.createRandomAdID.restore();
  });

  it('should dispatch addAd', () => {
    const expectedActions = [expectedAction];
    const store = mockStore({ ads: { ads: [] } }); // creates a store mock with empty ads
    sinon.stub(helpers, 'createRandomAdID').returns(23);
    store.dispatch(actions.generateAd());

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it("shouldn't dispatch two consecutive similar ads", () => {
    const expectedActions = [{
      type: actions.ADD_AD,
      ad: 15,
    }];

    const store = mockStore({ ads: { ads: [15, 23] } }); // creates a store mock with empty ads
    sinon.stub(helpers, 'createRandomAdID')
      .onFirstCall()
      .returns(23) // on first call to createRandomAdID returns duplicated ad
      .onSecondCall()
      .returns(15); // on second call returns the non-duplicated value

    store.dispatch(actions.generateAd());

    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('should call createRandomAdID to generate random ads ids', () => {
    const store = mockStore({ ads: { ads: [] } }); // creates a store mock with empty ads
    sinon.stub(helpers, 'createRandomAdID').returns(23);
    store.dispatch(actions.generateAd());

    expect(helpers.createRandomAdID).to.have.been.called;
  });
});
