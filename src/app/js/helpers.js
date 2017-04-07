import queryString from 'querystring';

export function getPaginationParams(page = 1, limit = 0, skip = 0) {
  const skipParameter = page > 1 && skip > 0 ? page * skip : undefined;
  const limitParameter = limit > 0 ? limit : undefined;

  return {
    skip: skipParameter,
    limit: limitParameter,
  };
}

export function createRandomAdID() {
  return Math.floor(Math.random() * 1000);
}

export function getUrlWithParams(url, params) {
  return `${url}?${queryString.stringify(params)}`;
}
