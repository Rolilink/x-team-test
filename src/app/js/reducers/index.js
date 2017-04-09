/*
  Reducers
*/
import * as actions from '../actions';

const initialState = {

};


// Reducer for faces actions modifies state.faces
export function faces(facesState  , action) {

};


// Reducer for sorting actions modifies state.sort
export function sort(sortState, action) {

};

// Reducer for pagination actions modifies state.pagination
export function pagination(paginationState, action) {

};

// Reducer for ads actions modifies state.ads
export function ads(adsState, action) {

};

/*
 * Root Reducer
 * Each action is grouped in its own reducer that are described above
 */
export function app(state = initialState, action) {
  switch (action.type) {
    // Faces Actions
    case actions.FETCH_FACES:
    case actions.ADD_FACES:
      return { ...state, faces: faces(state, action) };
    // Ads Actions
    case actions.GENERATE_AD:
    case actions.ADD_AD:
      return { ...state, ads: ads(state.ads, action) };
    // Pagination Actions
    case actions.SET_PAGE:
    case actions.SET_LIMIT:
    case actions.SET_SKIP:
      return { ...state, pagination: pagination(state.pagination, action) };
    // Sort Actions
    case actions.SET_SORT:
      return { ...state, sort: sort(state.sort, action) };
    default:
      return state;
  }
}
