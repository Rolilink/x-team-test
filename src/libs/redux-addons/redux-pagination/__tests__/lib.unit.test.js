import withPagination, { paginationFactory, cases, selectors } from '../';

const { setPage, setLimit, incrementPage, decrementPage } = cases;
const {
  getCurrentPage,
  getLimit,
  getNextPage,
  getPreviousPage,
  getBatchFromFirstPageToCurrent,
} = selectors();

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
  /* TODO: create passing properties scenario */
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

describe('selectors', () => {
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  describe('getCurrentPage', () => {
    it('should return the current page from the pagination state', () => {
      const state = {
        items,
        pagination: {
          page: 1,
          limit: 5,
        },
      };

      expect(getCurrentPage(state)).toMatchSnapshot();
    });
  });

  describe('getLimit', () => {
    it('should return the current limit from the pagination state', () => {
      const state = {
        items,
        pagination: {
          page: 1,
          limit: 5,
        },
      };

      expect(getLimit(state)).toMatchSnapshot();
    });
  });

  describe('getNextPage', () => {
    it('should return the next page from the pagination state', () => {
      const state = {
        items,
        pagination: {
          page: 1,
          limit: 5,
        },
      };

      expect(getNextPage(state)).toMatchSnapshot();
    });
  });

  describe('getPreviousPage', () => {
    it('should return the previous page from the pagination state', () => {
      const state = {
        items,
        pagination: {
          page: 2,
          limit: 5,
        },
      };

      expect(getPreviousPage(state)).toMatchSnapshot();
    });
  });

  describe('getBatchFromFirstPageToCurrent', () => {
    it('should return the current page from the pagination state', () => {
      const state = {
        items,
        pagination: {
          page: 1,
          limit: 5,
        },
      };

      expect(getBatchFromFirstPageToCurrent(state, { key: 'items' })).toMatchSnapshot();
    });
  });
});
