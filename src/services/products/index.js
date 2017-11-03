import queryString from 'querystring';
import API from '../../libs/api';
import getPaginationParams from '../../libs/getPaginationParams';

const api = new API();

const fetchProducts = ({ page = 1, limit = 10, sort } = {}) => (
  new Promise((resolve, reject) => {
    const paginationParams = getPaginationParams(page, limit);
    const params = sort ? { ...paginationParams, sort } : paginationParams;
    const resourcesUrl = `/products?${queryString.stringify(params)}`;

    api.fetch(resourcesUrl)
      .then((products) => {
        const response = sort ? { products, page, sort } : { products, page };

        resolve(response);
      })
      .catch(err => reject(err));
  })
);

export default fetchProducts;
