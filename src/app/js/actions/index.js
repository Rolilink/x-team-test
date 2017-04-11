/*
 *  #TODO: tests missing for the actions
 */

import _ from 'lodash';
import { fetchServer } from '../components/api';
import { createRandomAdID, getPaginationParams, getUrlWithParams } from '../helpers';

export const SET_FETCH_FACES = 'SET_FETCH_FACES';
export const ADD_FACES = 'ADD_FACES';
export const ADD_FACES_TO_LIST = 'ADD_FACES_TO_LIST';
export const SET_FETCHED_ALL_FACES = 'SET_FETCHED_ALL_FACES';
export const GENERATE_AD = 'GENERATE_AD';
export const ADD_AD = 'ADD_AD';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE';
export const SET_SERVER_LIMIT = 'SET_SERVER_LIMIT';
export const SET_LIST_PAGE = 'SET_LIST_PAGE';
export const SET_LIST_LIMIT = 'SET_LIST_LIMIT';
export const SET_SORT = 'SET_SORT';
export const RESET_SERVER_PAGINATION_STATE = 'RESET_PAGINATION_STATE';
export const RESET_FACES_STATE = 'RESET_FACES_STATE';
export const RESET_LIST_PAGINATION_STATE = 'RESET_LIST_PAGINATION_STATE';

// resets the servers pagination to its initial state with page = 0
export function resetServerPaginationState() {
  return {
    type: RESET_SERVER_PAGINATION_STATE,
  };
}

// resets the list pagination to its initial state with page = 0
export function resetListPaginationState() {
  return {
    type: RESET_LIST_PAGINATION_STATE,
  };
}

// resets the face state to its initial state, it leaves visibleFaces and faces empty
export function resetFacesState() {
  return {
    type: RESET_FACES_STATE,
  };
}

// sets if the app is fetching the server for records
export function setIsFetchingFaces(isFetching) {
  return {
    type: SET_FETCH_FACES,
    isFetching,
  };
}

// sets if all records have been fetched from the server
export function setFetchedAllFaces(fetchedAllFaces) {
  return {
    type: SET_FETCHED_ALL_FACES,
    fetchedAllFaces,
  };
}

// add a batch faces to the app state
export function addFaces(faces) {
  return {
    type: ADD_FACES,
    faces,
  };
}

// add a batch of faces to be rendered on the list
export function addFacesToList(faces) {
  return {
    type: ADD_FACES_TO_LIST,
    faces,
  };
}

// adds an ad to the end of the ads list
export function addAd(ad) {
  return {
    type: ADD_AD,
    ad,
  };
}

// sets the field that list should be sorted
export function setSort(field) {
  return {
    type: SET_SORT,
    field,
  };
}

// sets the page of records we should fetch from the server
export function setPage(page) {
  return {
    type: SET_SERVER_PAGE,
    page,
  };
}

// sets the quantity of faces that we should fetch from the server
export function setLimit(limit) {
  return {
    type: SET_SERVER_LIMIT,
    limit,
  };
}

// sets the page of the "batch of records" that will be added when scrolling to the end of the list
export function setListPage(page) {
  return {
    type: SET_LIST_PAGE,
    page,
  };
}

// sets the "batch size" of faces that are shown when scrolling down to the end of the list
export function setListLimit(limit) {
  return {
    type: SET_LIST_LIMIT,
    limit,
  };
}

// Handle pagination on the client side of the app, it shows "the next batch of faces"
// that are prefetched while scrolling but that aren't shown until we reach the end of
// the document
export function showNextFaces() {
  return (dispatch, getState) => {
    const state = getState();
    const { faces } = state.faces;
    const { limit, page } = state.listPagination;
    const nextPage = page + 1;
    const skip = nextPage > 1 ? page * limit : 0;

    // Gets the next batch of element skipping x components and taking limit component more.
    const nextFaces = _.chain(faces).map(face => face.id).slice(skip, skip + limit).value();

    // when there are faces to show dispatch addFacesToList to show them.
    if (nextFaces.length > 0) {
      dispatch(setListPage(nextPage));
      dispatch(addFacesToList(nextFaces));
    }
  };
}

// It generates an ad id and adds it to the end of ads state
export function generateAd() {
  return (dispatch, getState) => {
    const state = getState();
    const { ads } = state.ads;
    const lastAd = _.last(ads);
    // Creates a random Id
    let newAd = createRandomAdID();

    // Recreate random Id until the Id created is different from the last id
    // on the ad state
    while (newAd === lastAd) {
      newAd = createRandomAdID();
    }

    // add new id to the end of ads state
    dispatch(addAd(newAd));
    return newAd;
  };
}

// Fetch faces from the server using the API.fetchServer function,
// generates the url to fetch from pagination and sort parameters
// and handle the response to add faces to the app state
export function fetchFaces() {
  return (dispatch, getState) => {
    // pagination starts on 0 and always gets the next page of records
    const state = getState();
    const { page, limit } = state.pagination; // Advances to next paginated request
    const nextPage = page + 1;

    // get pagination and sort params always from the next page
    const paginationParams = getPaginationParams(nextPage, limit);
    const sortParams = { sort: state.sort.field };

    // join params in one object
    const params = { ...paginationParams, sort: sortParams.sort };

    // gets url to fetch
    const url = getUrlWithParams('/api/products', params);

    // set faces.isFetching to true before fetching data from the server
    dispatch(setIsFetchingFaces(true));
    return fetchServer(url).then((response) => {
      const currentState = getState();
      const currentSort = currentState.sort.field;
      const requestSort = state.sort.field;

      // Api is not fetching data so lets set fetchingFaces to false
      dispatch(setIsFetchingFaces(false));

      // when data fetch is completed and the sorting state has changed
      // don't append fetched data to the state
      if (currentSort !== requestSort) {
        return;
      }

      if (response.data.length > 0) {
        // when data is returned add faces to the array and change the page
        dispatch(addFaces(response.data));
        dispatch(setPage(page + 1));
      } else {
        // when there are no more records to return set faces.fetchedAllFaces to true
        dispatch(setFetchedAllFaces(true));
      }
    });
  };
}

// Resets faces list state, server paginations state, list pagination state
export function resetListState(dispatch) {
  dispatch(resetFacesState());
  dispatch(resetServerPaginationState());
  dispatch(resetListPaginationState());
}

// Triggered by the sort select it changes the sort state, resets the list state,
// fetches the first batch of faces and shows them.
export function changeSort(newField) {
  return (dispatch, getState) => {
    const state = getState();
    const oldField = state.sort.field;

    // why to dispatch a lot of actions when we are not updating the state?
    if (newField === oldField) {
      return;
    }

    // change sort field
    dispatch(setSort(newField));

    // Resets
    dispatch(resetFacesState());
    resetListState(dispatch);

    dispatch(fetchFaces()).then(() => dispatch(showNextFaces()));
  };
}

// It fetches faces from the server when the api is not fetching data
export function maybeFetchFaces() {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.faces;

    if (!isFetching) {
      return dispatch(fetchFaces());
    }

    return Promise.resolve('done');
  };
}
