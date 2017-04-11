import queryString from 'querystring';

// returns skip and limit params to paginate server requests
export function getPaginationParams(page = 1, limit = 0) {
  const skipParameter = page > 1 && limit > 0 ? page * limit : undefined;
  const limitParameter = limit > 0 ? limit : undefined;

  return {
    skip: skipParameter,
    limit: limitParameter,
  };
}

// creates a random id for the ad
export function createRandomAdID() {
  return Math.floor(Math.random() * 1000);
}

//  returns the url with params
export function getUrlWithParams(url, params) {
  return `${url}?${queryString.stringify(params)}`;
}
