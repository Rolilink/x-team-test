/*
 *  #TODO: tests missing for the reducers
 *  this module exposes a small wrapper around the fetch API, to fetch the server
 *  for records and parse the response based on its content-type
 */

import * as actions from '../actions';

export const initialState = {
  faces: {
    isFetching: false,
    faces: [],
    visibleFaces: [],
    fetchedAllFaces: false,
  },
  sort: {
    field: 'id',
  },
  pagination: {
    limit: 25,
    page: 0,
  },
  listPagination: {
    limit: 25,
    page: 0,
  },
  ads: {
    ads: [],
  },
  isNetworkInvalidated: false,
};


// Reducer for faces actions modifies state.faces
export function faces(facesState, action) {
  switch (action.type) {
    case actions.SET_FETCH_FACES:
      return { ...facesState, isFetching: action.isFetching };
    case actions.ADD_FACES:
      return { ...facesState, faces: [...facesState.faces, ...action.faces] };
    case actions.ADD_FACES_TO_LIST:
      return { ...facesState, visibleFaces: [...facesState.visibleFaces, ...action.faces] };
    case actions.RESET_FACES_STATE:
      return initialState.faces;
    case actions.SET_FETCHED_ALL_FACES:
      return { ...facesState, fetchedAllFaces: action.fetchedAllFaces };
    default:
      return facesState;
  }
}


// Reducer for sorting actions modifies state.sort
export function sort(sortState, action) {
  switch (action.type) {
    case actions.SET_SORT:
      return { ...sortState, field: action.field };
    default:
      return sortState;
  }
}

// Reducer for server pagination actions modifies state.pagination
export function pagination(paginationState, action) {
  switch (action.type) {
    case actions.SET_SERVER_LIMIT:
      return { ...paginationState, limit: action.limit };
    case actions.SET_SERVER_PAGE:
      return { ...paginationState, page: action.page };
    case actions.RESET_SERVER_PAGINATION_STATE:
      return { ...initialState.pagination };
    default:
      return paginationState;
  }
}

// Reducer for client side pagination modifies state.listPagination
export function listPagination(listPaginationState, action) {
  switch (action.type) {
    case actions.SET_LIST_LIMIT:
      return { ...listPaginationState, limit: action.limit };
    case actions.SET_LIST_PAGE:
      return { ...listPaginationState, page: action.page };
    case actions.RESET_LIST_PAGINATION_STATE:
      return { ...initialState.listPagination };
    default:
      return listPaginationState;
  }
}

// Reducer for ads actions modifies state.ads
export function ads(adsState, action) {
  switch (action.type) {
    case actions.ADD_AD:
      return { ...adsState, ads: [...adsState.ads, action.ad] };
    default:
      return adsState;
  }
}

/*
 * Root Reducer
 * Each group of actions its enclosed in its own function that mutates only the
 * part of the state that concerns to the group.
 */
export function app(state = initialState, action) {
  switch (action.type) {
    // Faces Actions
    case actions.SET_FETCH_FACES:
    case actions.ADD_FACES:
    case actions.ADD_FACES_TO_LIST:
    case actions.SET_FETCHED_ALL_FACES:
    case actions.RESET_FACES_STATE:
      return { ...state, faces: faces(state.faces, action) };
    // Ads Actions
    case actions.ADD_AD:
      return { ...state, ads: ads(state.ads, action) };
    // Server Pagination Actions
    case actions.SET_SERVER_PAGE:
    case actions.SET_SERVER_LIMIT:
    case actions.RESET_SERVER_PAGINATION_STATE:
      return { ...state, pagination: pagination(state.listPagination, action) };
    // List Pagination Actions
    case actions.SET_LIST_PAGE:
    case actions.SET_LIST_LIMIT:
    case actions.RESET_LIST_PAGINATION_STATE:
      return { ...state, listPagination: listPagination(state.listPagination, action) };
    // Sort Actions
    case actions.SET_SORT:
      return { ...state, sort: sort(state.sort, action) };
    case actions.INVALIDATE_NETWORK:
      return { ...state, isNetworkInvalidated: action.invalidated };
    default:
      return state;
  }
}
