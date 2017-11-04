import withPagination from '../../../../../libs/redux-addons/redux-pagination';
import withSorting from '../../../../../libs/redux-addons/redux-sort';
import withNetworking from '../../../../../libs/redux-addons/redux-networking';
import makeReducer from '../../../../../libs/redux-addons/redux-make-reducer';
import composeEnhancers from '../../../../../libs/composeEnhancers';

const productsStateFactory = ({ productsById = {} } = {}) => ({ productsById });


const productsCases = { };

export default (initialState = {}) => (
  makeReducer(
    productsCases,
    productsStateFactory(initialState),
    composeEnhancers(
      [
        withPagination,
        withSorting,
        withNetworking,
      ],
      [
        initialState.pagination,
        initialState.sort,
        initialState.network,
      ],
    ),
  )
);
