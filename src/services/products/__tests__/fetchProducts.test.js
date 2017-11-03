import parse from 'url-parse';
import fetchProducts from '../';

jest.mock('../../../libs/api');

const APIModule = require('../../../libs/api');

const defaultResponse = [
  { id: 1, size: 17, price: 601, face: '(ง⌐□ل͜□)ง', date: 'Thu Nov 02 2017 02:04:51 GMT-0500 (-05)' },
  { id: 2, size: 13, price: 642, face: '(ღ˘⌣˘ღ)', date: 'Sat Oct 28 2017 05:16:46 GMT-0500 (-05)' },
];

const fetchFn = jest.fn(() => Promise.resolve(defaultResponse));

APIModule.__setFetchFn(fetchFn);


describe('Services.Products.fetchProducts', () => {
  beforeEach(() => fetchFn.mockClear());

  it('should call fetch', () => (
    fetchProducts().then(() => (
      expect(fetchFn).toHaveBeenCalled()
    ))
  ));

  it('should call fetch with /products pathname', () => (
    fetchProducts().then(() => {
      const receivedUrl = fetchFn.mock.calls[0][0];
      const { pathname } = parse(receivedUrl, true);

      expect(pathname).toMatchSnapshot();
    })
  ));

  it('should call fetch with default pagination params', () => (
    fetchProducts().then(() => {
      const receivedUrl = fetchFn.mock.calls[0][0];
      const { query } = parse(receivedUrl, true);

      expect(query).toMatchSnapshot();
    })
  ));

  it('should call api with the correct pagination params when receiving pagination params via options', () => {
    const productsOptions = { page: 2, limit: 10 };

    fetchProducts(productsOptions).then(() => {
      const receivedUrl = fetchFn.mock.calls[0][0];
      const { query } = parse(receivedUrl, true);

      expect(query).toMatchSnapshot();
    });
  });

  test.only('should call api with correct sort params when receiving sort params via options', () => {
    const productsOptions = { sort: 'size' };

    fetchProducts(productsOptions).then(() => {
      const receivedUrl = fetchFn.mock.calls[0][0];
      const { query } = parse(receivedUrl, true);

      expect(query).toMatchSnapshot();
    });
  });

  it('should respond with products when response is success', () => (
    fetchProducts().then(result => (
      expect(result).toMatchSnapshot()
    ))
  ));

  it('should respond with page opt when response is success', () => {
    const productsOptions = { page: 2, limit: 10 };

    fetchProducts(productsOptions).then(result => (
      expect(result).toMatchSnapshot()
    ));
  });

  it('should respond with sort opts when response is success', () => {
    const productsOptions = { sort: 'name' };

    fetchProducts(productsOptions).then(result => (
      expect(result).toMatchSnapshot()
    ));
  });

  /* TODO: Error Case Test */
});
