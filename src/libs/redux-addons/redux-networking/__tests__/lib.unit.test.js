import withNetwork, { networkFactory, cases, selectors } from '../';


const { setSuccess, setFetching, setError } = cases;
const { getIsFetching, getError } = selectors();

describe('cases.setSuccess', () => {
  it('should set state to default state', () => {
    const state = {
      items: [],
      network: {
        isFetching: true,
        error: 'error',
      },
    };

    expect(setSuccess(state)).toMatchSnapshot();
  });
});

describe('cases.setFetching', () => {
  it('should set fetching to true and error to null', () => {
    const state = {
      items: [],
      network: {
        isFetching: false,
        error: 'error',
      },
    };

    expect(setFetching(state)).toMatchSnapshot();
  });
});

describe('cases.setError', () => {
  it('should set error state with the action payload and isFetching to false', () => {
    const state = {
      items: [],
      network: {
        isFetching: true,
        error: null,
      },
    };

    const action = { payload: 'error' };

    expect(setError(state, action)).toMatchSnapshot();
  });
});

describe('factory.networkFactory', () => {
  /* TODO: create passing properties scenario */
  it('should return default network state', () => {
    expect(networkFactory()).toMatchSnapshot();
  });
});

describe('enhancer.withNetwork', () => {
  it('should enhance received state to add network state', () => {
    const state = {
      items: [],
    };

    expect(withNetwork(state)).toMatchSnapshot();
  });

  it('should be able to initialize network state', () => {
    const state = {
      items: [],
    };
    const initialNetworkState = {
      isFetching: true,
      error: 'error',
    };

    expect(withNetwork(state, initialNetworkState)).toMatchSnapshot();
  });
});

describe('selectors.getIsFetching', () => {
  const state = {
    items: [],
    network: {
      isFetching: false,
      error: 'error',
    },
  };

  it('should return the isFetching value', () => {
    expect(getIsFetching(state)).toMatchSnapshot();
  });
});

describe('selectors.getError', () => {
  const state = {
    items: [],
    network: {
      isFetching: false,
      error: 'error',
    },
  };

  it('should return the error value', () => {
    expect(getError(state)).toMatchSnapshot();
  });
});
