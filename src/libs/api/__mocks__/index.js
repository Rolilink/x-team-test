let fetchFn = () => {};

function __setFetchFn(fn) {
  fetchFn = fn;
}

export const HOST = process.env.REACT_APP_API_HOST;


export default class API {
  get fetch() {
    return fetchFn;
  }
}


export {
  __setFetchFn,
};
