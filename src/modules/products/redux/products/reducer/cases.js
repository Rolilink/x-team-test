import { cases as networkCases } from '../../../../../libs/redux-addons/redux-networking';
import { cases as paginationCases } from '../../../../../libs/redux-addons/redux-pagination';
import { createCase } from '../../../../../libs/redux-addons/redux-cases';

export const addProductsToProductsById = (state, { payload }) => ({
  ...state,
  productsById: payload.products.reduce(
    (productsById, product) => ({
      ...productsById,
      [product.id]: product,
    }),
    state.productsById,
  ),
});

const onProductFetchSuccess = createCase([
  networkCases.setSuccess,
  addProductsToProductsById,
  paginationCases.setPage,
]);

const maybeOnFetchSuccess = (state, action) => {
  const stateSort = Object.keys(state.sort)[0];
  const actionSort = Object.keys(action.payload.sort)[0];

  if (stateSort !== actionSort) {
    return state;
  }

  return onProductFetchSuccess(state, action);
};

export const onFetchSuccess = maybeOnFetchSuccess;
