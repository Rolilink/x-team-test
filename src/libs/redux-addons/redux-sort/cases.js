import _ from 'lodash';
import sortingFactory from './factory';
import { createCases } from '../redux-cases';

const { clearSort, setField, unsetField } = createCases({
  clearSort: state => ({ ...state, sort: sortingFactory() }),
  setField: (state, { payload }) =>
    ({
      ...state,
      sort: sortingFactory({ ...state.sort, ...payload.sort }),
    }),
  unsetField: (state, { payload }) => ({
    ...state,
    sort: sortingFactory(_.omit(state.sort, payload.sort.key)),
  }),
});

export default {
  clearSort,
  setField,
  unsetField,
};
