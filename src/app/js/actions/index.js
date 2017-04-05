import _ from 'lodash';
import fetchServer from '../components/api';

/*
  Actions Logic

  We need actions to:
    parse the server (only when we are not parsing) : MAYBE_FETCH_FACES
    add faces : ADD_FACES
    generate an ad : FETCH_AD
    add ad: ADD_AD
    set the pagination : SET_PAGE
    set item range to show start : SET_VISIBLE_RANGE_START
    set item range to show end : SET_VISIBLE_RANGE_END
    set loaded all the records : SET_LOADED_ALL_RECORDS
*/

export const ADD_FACES = 'ADD_FACES';
export const GENERATE_AD = 'GENERATE_AD';
export const ADD_AD = 'ADD_AD';
export const SET_PAGE = 'SET_PAGE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_SKIP = 'SET_SKIP';
// export const SET_VISIBLE_RANGE_START = 'SET_VISIBLE_RANGE_START';
// export const SET_VISIBLE_RANGE_END = ' SET_VISIBLE_RANGE_END';
// export const SET_LOADED_ALL_RECORDS = 'SET_LOADED_ALL_RECORDS';

function createRandomAdID() {
  return Math.floor(Math.random() * 1000);
}

function getPaginationParams(page = 0, limit = 0, skip = 0) {
  const skipParameter = page > 1 && skip > 0 ? `skip=${page * skip}` : '';
  const limitParameter = limit > 0 ? `limit=${limit}` : '';
  const url = '/api/products';

  if (skipParameter !== '' && limitParameter !== '') {
    return `${url}?${limitParameter}&${skipParameter}`;
  }

  if (limitParameter !== '') {
    return `${url}?${limitParameter}`;
  }

  if (skipParameter !== '') {
    return `${url}?${skipParameter}`;
  }

  return url;
}

function addFaces(faces) {
  return {
    action: ADD_FACES,
    faces,
  };
}

function addAd(ad) {
  return {
    action: ADD_AD,
    ad,
  };
}

export function setPage(page) {
  return {
    action: SET_PAGE,
    page,
  };
}

export function setLimit(limit) {
  return {
    action: SET_LIMIT,
    limit,
  };
}


export function setSkip(skip) {
  return {
    action: SET_SKIP,
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

    dispatch(addAd(newAd));
  };
}

export function fetchFaces() {
  return (dispatch, getState) => {
    const state = getState();
    const { page, limit, skip } = state.pagination + 1; // Advances to next paginated request
    const url = getPaginationParams(page, limit, skip)

    return fetchServer(url).then((data) => {
      return dispatch(addFaces(data.faces))
      .then(() => {
        dispatch(setPage(page));
      });
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
