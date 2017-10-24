import withPagination, { paginationFactory, cases } from '../';

const { setPage, setLimit, incrementPage, decrementPage } = cases;

describe('cases.setPage', () => {
  it('should set page from payload', () => {
    const state = {
      items: [],
      pagination: {
        page: 0,
        limit: 10,
      },
    };

    const action = { payload: { pagination: { page: 5 } } };

    expect(setPage(state, action)).toMatchSnapshot();
  });
});

describe('cases.setLimit', () => {
  it('should set limit from payload', () => {
    const state = {
      items: [],
      pagination: {
        page: 0,
        limit: 10,
      },
    };

    const action = { payload: { pagination: { limit: 5 } } };

    expect(setLimit(state, action)).toMatchSnapshot();
  });
});

describe('cases.incrementPage', () => {
  it('should increment page from state', () => {
    const state = {
      items: [],
      pagination: {
        page: 0,
        limit: 10,
      },
    };

    expect(incrementPage(state)).toMatchSnapshot();
  });
});

describe('cases.decrementPage', () => {
  it('should decrement page from state', () => {
    const state = {
      items: [],
      pagination: {
        page: 2,
        limit: 10,
      },
    };

    expect(decrementPage(state)).toMatchSnapshot();
  });

  it('should never decrement less than zero', () => {
    const state = {
      items: [],
      pagination: {
        page: 0,
        limit: 10,
      },
    };

    expect(decrementPage(state)).toMatchSnapshot();
  });
});

describe('paginationFactory', () => {
  it('should return default state', () => {
    expect(paginationFactory()).toMatchSnapshot();
  });
});

describe('enhancer.withPagination', () => {
  it('should enhance received state to add network state', () => {
    const state = {
      items: [],
    };

    expect(withPagination(state)).toMatchSnapshot();
  });

  it('should be able to initialize network state', () => {
    const state = {
      items: [],
    };
    const initialPaginationState = {
      page: 1,
      limit: 10,
    };

    expect(withPagination(state, initialPaginationState)).toMatchSnapshot();
  });
});
