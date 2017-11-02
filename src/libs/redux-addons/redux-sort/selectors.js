import { createSelector } from 'reselect';

const getSortState = state => state.sort;
const getFieldFromParams = (state, { field }) => field;

export default () => ({
  getFields: createSelector(
    getSortState,
    sort => Object.keys(sort).map(field => ({ [field]: sort[field] })),
  ),
  getField: createSelector(
    getSortState,
    getFieldFromParams,
    (sort, field) => sort[field],
  ),
});
