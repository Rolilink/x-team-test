import { createCases } from '../redux-cases';
import paginationFactory from './factory';

const { setPage, setLimit, incrementPage, decrementPage } = createCases({
  setPage: (state, { payload }) => ({
    ...state,
    pagination: paginationFactory({ page: payload.pagination.page, limit: state.pagination.limit }),
  }),
  setLimit: (state, { payload }) => ({
    ...state,
    pagination: paginationFactory({ limit: payload.pagination.limit, page: state.pagination.page }),
  }),
  incrementPage: state => ({
    ...state,
    pagination: paginationFactory({ page: state.pagination.page + 1, limit: state.limit }),
  }),
  decrementPage: state => ({
    ...state,
    pagination: paginationFactory({
      page: state.pagination.page < 1 ? 0 : state.pagination.page - 1,
      limit: state.pagination.limit,
    }),
  }),
});

export default {
  setPage,
  setLimit,
  incrementPage,
  decrementPage,
};
