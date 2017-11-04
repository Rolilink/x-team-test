import { addProductsToProductsById, onFetchSuccess } from '../cases';

const products = [
  { id: 1, size: 17, price: 601, face: '(ง⌐□ل͜□)ง', date: 'Thu Nov 02 2017 02:04:51 GMT-0500 (-05)' },
  { id: 2, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
  { id: 3, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
  { id: 4, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
];

const initialState = {
  productsById: {
    [products[0].id]: products[0],
    [products[1].id]: products[1],
  },
  sort: {
    name: 'asc',
  },
  pagination: {
    page: 1,
    limit: 2,
  },
  network: {
    isFetching: true,
    error: null,
  },
};

describe('Products.Redux.Products.Cases', () => {
  describe('addProductsToProductsById', () => {
    it('should add action.payload.products to productsById', () => {
      const action = { payload: { products: [products[2], products[3]] } };
      const result = addProductsToProductsById(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('onFetchSuccess', () => {
    const action = { payload: { products: [products[2], products[3]], sort: { name: 'asc' }, pagination: { page: 2 } } };
    const result = onFetchSuccess(initialState, action);

    it('should add action.payload.products to productsById', () => {
      expect(result.productsById).toMatchSnapshot();
    });

    it('should set network state to default', () => {
      expect(result.network).toMatchSnapshot();
    });

    it('should set page to action.payload.pagination.page', () => {
      expect(result.pagination.page).toMatchSnapshot();
    });

    it('should not change state if action.payload.sort is different from actual sort', () => {
      const actionWithDiffSort = { payload: { products: [products[2], products[3]], sort: { size: 'asc' }, pagination: { page: 2 } } };
      const resultWithDiffSort = onFetchSuccess(initialState, actionWithDiffSort);

      expect(resultWithDiffSort).toMatchSnapshot();
    });
  });
});
