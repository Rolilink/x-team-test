import withSorting, { sortingFactory, cases, selectors } from '../';

const { clearSort, setField, unsetField } = cases;
const { getFields, getField } = selectors();

const defaultState = {
  items: [],
  sort: {},
};

describe('cases', () => {
  describe('clearSort', () => {
    it('should set the sort subtree to an empty object', () => {
      const state = { ...defaultState };
      const newState = clearSort(state, {});

      expect(newState).toMatchSnapshot();
    });
  });


  describe('setField', () => {
    it('should add the specified record to the sort subtree', () => {
      const state = { ...defaultState, sort: { size: 'asc' } };
      const action = { payload: { sort: { name: 'asc' } } };
      const newState = setField(state, action);

      expect(newState).toMatchSnapshot();
    });

    it('should update the specified record from the sort subtree if it exist', () => {
      const state = { ...defaultState, sort: { size: 'asc', name: 'asc' } };
      const action = { payload: { sort: { name: 'desc' } } };
      const newState = setField(state, action);

      expect(newState).toMatchSnapshot();
    });
  });

  describe('unsetField', () => {
    it('should remove the specified record from the sort subtree', () => {
      const state = { ...defaultState, sort: { size: 'asc', name: 'asc' } };
      const action = { payload: { sort: { key: 'size' } } };
      const newState = unsetField(state, action);

      expect(newState).toMatchSnapshot();
    });
  });
});

describe('selectors', () => {
  describe('getFields', () => {
    it('should return all the sorts as an array', () => {
      const state = { ...defaultState, sort: { size: 'asc', name: 'asc' } };
      const result = getFields(state);

      expect(result).toMatchSnapshot();
    });
  });

  describe('getField', () => {
    it('should return the sort status of the key passed as param', () => {
      const state = { ...defaultState, sort: { size: 'asc', name: 'desc' } };
      const result = getField(state, { field: 'name' });

      expect(result).toMatchSnapshot();
    });
  });
});

describe('withSorting', () => {
  it('should enhance the state with sort state', () => {
    const state = { items: [] };
    const newState = withSorting(state);

    expect(newState).toMatchSnapshot();
  });

  it('should be able to initialize the sort state ', () => {
    const state = { items: [] };
    const initialSortingState = { name: 'asc' };
    const newState = withSorting(state, initialSortingState);

    expect(newState).toMatchSnapshot();
  });
});

describe('sortingFactory', () => {
  /* TODO: create passing properties scenario */
  it('should return default sort state', () => {
    const sort = sortingFactory();

    expect(sort).toMatchSnapshot();
  });
});
