/*
  Reducers
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
 * Each action is grouped in its own reducer that are described above
 */
export function app(state = initialState, action) {
  switch (action.type) {
    // Faces Actions
    case actions.SET_FETCH_FACES:
    case actions.ADD_FACES:
    case actions.ADD_FACES_TO_LIST:
    case actions.SET_FETCHED_ALL_FACES:
      return { ...state, faces: faces(state.faces, action) };
    // Ads Actions
    case actions.ADD_AD:
      return { ...state, ads: ads(state.ads, action) };
    // Server Pagination Actions
    case actions.SET_SERVER_PAGE:
    case actions.SET_SERVER_LIMIT:
      return { ...state, pagination: pagination(state.listPagination, action) };
    // List Pagination Actions
    case actions.SET_LIST_PAGE:
    case actions.SET_LIST_LIMIT:
      return { ...state, listPagination: listPagination(state.listPagination, action) };
    // Sort Actions
    case actions.SET_SORT:
      return { ...state, sort: sort(state.sort, action) };
    default:
      return state;
  }
}
