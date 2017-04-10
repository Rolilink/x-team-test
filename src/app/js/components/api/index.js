import 'isomorphic-fetch';

const ENDPOINT = 'http://localhost:8080'; // Development Endpoint
// const ENDPOINT = 'http://localhost:8000'; // Production Endpoint

export function parseNDJSON(response) {
  return new Promise((resolve, reject) => {
    response
      .text()
      .then((text) => {
        const data = text.split('\n');
        data.splice(-1);

        resolve(JSON.parse(`{ "data": [${data.join(',')}] }`));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function fetchServer(location, options = {}) {
  const httpOptions = {
    ...options,
  };

  return fetch(ENDPOINT + location, httpOptions)
    .then((response) => {
      if (response.status === 404) {
        console.log('404 error: ', response);
        return new Promise((resolve, reject) => (reject({ error: '404 not found.' })));
      }

      const contentType = response.headers.get('content-type');

      switch (contentType) {
        case 'application/json':
          return response.json();
        case 'application/x-json-stream':
          return parseNDJSON(response);
        default:
          return response.text();
      }
    }, (response) => {
      console.log('fail response', response);
      return response;
    });
}
