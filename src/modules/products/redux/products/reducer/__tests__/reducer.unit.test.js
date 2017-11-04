import makeProductsReducer from '../';
import { FETCH_PRODUCTS_SUCCESS } from '../../actionTypes';

const products = [
  { id: 1, size: 17, price: 601, face: '(ง⌐□ل͜□)ง', date: 'Thu Nov 02 2017 02:04:51 GMT-0500 (-05)' },
  { id: 2, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
  { id: 3, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
];

const initialState = {
  productsById: { },
  sort: { },
  pagination: {
    page: 0,
    limit: 0,
  },
  network: {
    isFetching: false,
    error: null,
  },
};


describe('Products.Redux.Reducers.Products', () => {
  describe('makeReducer', () => {
    it('should return a reducer function', () => {
      const reducer = makeProductsReducer();

      expect(typeof reducer).toBe('function');
    });

    it('should be able to modify the reducer initial state', () => {
      const modifiedInitialState = {
        productsById: {
          [products[0].id]: products[0],
        },
        sort: {
          name: 'asc',
        },
        pagination: {
          page: 2,
          limit: 10,
        },
        network: {
          isFetching: true,
          error: null,
        },
      };
      const reducer = makeProductsReducer(modifiedInitialState);

      expect(reducer()).toMatchSnapshot();
    });
  });

  describe('reducer', () => {
    const reducer = makeProductsReducer();

    it('should contain default productsById field', () => {
      const productsById = reducer().productsById;

      expect(productsById).toMatchSnapshot();
    });

    it('should contain default sort field', () => {
      const sort = reducer().sort;

      expect(sort).toMatchSnapshot();
    });

    it('should contain default pagination params', () => {
      const pagination = reducer().pagination;

      expect(pagination).toMatchSnapshot();
    });

    it('should contain default network params', () => {
      const network = reducer().network;

      expect(network).toMatchSnapshot();
    });

    it('should add products to productsById when receiving an FETCH_PRODUCTS_SUCCESS action', () => {
      const state = { ...initialState, productsById: { [products[0].id]: products[0] } };
      const action = { type: FETCH_PRODUCTS_SUCCESS, payload: { products: [products[1], products[2]] } };
      const result = {
        ...state,
        productsById: {
          ...state.productsById,
          [products[1].id]: products[1],
          [products[2].id]: products[2],
        }
      };

      expect(result.productsById).toMatchSnapshot();
    });

    it('should not add products to productsById when receiving an FETCH_PRODUCTS_SUCCESS action that contains a different sort from current one', () => {
      const state = { ...initialState, productsById: { [products[0].id]: products[0] }, sort: { name: 'asc' } };
      const action = { type: FETCH_PRODUCTS_SUCCESS, payload: { products: [products[1], products[2]], sort: 'name' } };
      const result = { ...state };

      expect(result.productsById).toMatchSnapshot();
    });


    it('should set network to default state when receiving an FETCH_PRODUCTS_SUCCESS action', () => {
      const state = { ...initialState, productsById: { [products[0].id]: products[0] }, network: { ...initialState.network, isFetching: true } };
      const action = { type: FETCH_PRODUCTS_SUCCESS, payload: { products: [products[1], products[2]] } };
      const result = { ...state, network: { ...initialState.network } };

      expect(result.network).toMatchSnapshot();
    });

    it('should set network error when receiving an FETCH_PRODUCTS_ERROR action');
    it('should set network isFetching when receiving an FETCH_PRODUCTS_PENDING action');
    it('should set network state to default when receiving RESET_PRODUCTS_NETWORK action');
    it('should clear productsById when receiving an CLEAR_PRODUCTS action');
    it('should set sort when receiving an SET_PRODUCTS_SORT action');
    it('should set page when receiving an SET_PRODUCTS_PAGE action');
    it('should set limit when receiving a SET_PRODUCTS_LIMIT action');
  });
});
