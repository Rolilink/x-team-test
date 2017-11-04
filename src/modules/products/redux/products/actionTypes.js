import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';

export const FETCH_PRODUCTS = 'x-team/discount-ascii-warehouse/products/FETCH';
export const FETCH_PRODUCTS_SUCCESS = `${FETCH_PRODUCTS}_${FULFILLED}`;
export const FETCH_PRODUCTS_ERROR = `${FETCH_PRODUCTS}_${REJECTED}`;
export const FETCH_PRODUCTS_LOADING = `${FETCH_PRODUCTS}_${PENDING}`;
