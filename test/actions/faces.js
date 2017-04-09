/* global expect */
/* global sinon */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as helpers from '../../src/app/js/helpers';
import * as actions from '../../src/app/js/actions';
import * as api from '../../src/app/js/components/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = { sort: {}, faces: { data: [], fetching: false }, pagination: { page: 0 } };
const facesExample = [
  {
    id: '1',
    size: 19,
    price: 351,
    date: '',
    face: '',
  },
];

describe('FacesActions#addFaces', () => {
  it('should return action with type ADD_FACES and a faces array', () => {
    const faces = [...facesExample];
    const expectedAction = {
      type: actions.ADD_FACES,
      faces,
    };

    expect(actions.addFaces(faces)).to.deep.equal(expectedAction);
  });
});

describe('FacesActions#fetchFaces', () => {
  beforeEach(() => {
    sinon.stub(helpers, 'getPaginationParams').returns({});
    sinon.stub(helpers, 'getUrlWithParams').returns('/api/products');
    sinon.stub(api, 'fetchServer').returns(Promise.resolve({ data: facesExample }));
  });

  afterEach(() => {
    helpers.getPaginationParams.restore();
    helpers.getUrlWithParams.restore();
    api.fetchServer.restore();
  });

  it('should call fetchServer for faces', () => {
    const store = mockStore(initialState);

    store.dispatch(actions.fetchFaces());
    expect(api.fetchServer).to.have.been.called;
  });

  it('should paginate results', (done) => {
    const store = mockStore({
      ...initialState,
      pagination: { ...initialState.pagination, page: 1 },
    });
    const paginationAction = {
      type: actions.SET_PAGE,
      page: 2,
    };

    store.dispatch(actions.fetchFaces())
      .then(() => {
        const currentActions = store.getActions();

        expect(currentActions).to.deep.include(paginationAction);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should eventually dispatch addFaces action with faces', (done) => {
    const store = mockStore({
      ...initialState,
      pagination: { ...initialState.pagination, page: 1 },
    });
    const addFacesAction = {
      type: actions.ADD_FACES,
      faces: facesExample,
    };

    store.dispatch(actions.fetchFaces())
      .then(() => {
        const currentActions = store.getActions();

        expect(currentActions).to.deep.include(addFacesAction);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
