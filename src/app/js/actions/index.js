import _ from 'lodash';
import { fetchServer } from '../components/api';
import { createRandomAdID, getPaginationParams, getUrlWithParams } from '../helpers';

export const SET_FETCH_FACES = 'SET_FETCH_FACES';
export const ADD_FACES = 'ADD_FACES';
export const GENERATE_AD = 'GENERATE_AD';
export const ADD_AD = 'ADD_AD';
export const SET_PAGE = 'SET_PAGE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_SKIP = 'SET_SKIP';
export const SET_SORT = 'SET_SORT';
// export const SET_VISIBLE_RANGE_START = 'SET_VISIBLE_RANGE_START';
// export const SET_VISIBLE_RANGE_END = ' SET_VISIBLE_RANGE_END';
// export const SET_LOADED_ALL_RECORDS = 'SET_LOADED_ALL_RECORDS';

export function setFetchFaces(isFetching) {
  return {
    type: SET_FETCH_FACES,
    isFetching,
  };
}

export function addFaces(faces) {
  return {
    type: ADD_FACES,
    faces,
  };
}

export function addAd(ad) {
  return {
    type: ADD_AD,
    ad,
  };
}

export function setSort(field) {
  return {
    type: SET_SORT,
    field,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

export function setLimit(limit) {
  return {
    type: SET_LIMIT,
    limit,
  };
}


export function setSkip(skip) {
  return {
    type: SET_SKIP,
    skip,
  };
}

export function generateAd() {
  return (dispatch, getState) => {
    const state = getState();
    const { ads } = state;
    const lastAd = _.last(ads);

    let newAd = createRandomAdID();

    while (newAd === lastAd) {
      newAd = createRandomAdID();
    }

    return dispatch(addAd(newAd));
  };
}

export function fetchFaces() {
  return (dispatch, getState) => {
    const state = getState();
    const { page, limit } = state.pagination; // Advances to next paginated request
    const nextPage = page + 1;
    const paginationParams = getPaginationParams(nextPage, limit);
    const sortParams = { sort: state.sort.field };
    const params = { ...paginationParams, sort: sortParams.sort };
    const url = getUrlWithParams('/api/products', params);
    dispatch(setFetchFaces(true));

    return fetchServer(url).then((response) => {
      dispatch(addFaces(response.data));
      dispatch(setPage(page + 1));
      dispatch(setFetchFaces(false));
    });
  };
}

export function maybeFetchFaces() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.faces.isFetching) {
      return dispatch(fetchFaces());
    }

    return Promise.resolve('done');
  };
}
