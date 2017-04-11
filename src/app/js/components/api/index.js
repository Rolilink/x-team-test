// this module exposes a small wrapper around the fetch API, to fetch the server
// for records and parse the response based on its content-type

import 'isomorphic-fetch';

const ENDPOINT = 'http://localhost:8080';

// Parses new-delimited json
export function parseNDJSON(response) {
  return new Promise((resolve, reject) => {
    response
      .text()
      .then((text) => {
        // get an array of json object strings from the server
        const data = text.split('\n');

        // remove the empty string at the end of the array
        data.splice(-1);

        // joins all the json records in a JSON string wrapped by an array and parse it
        const json = JSON.parse(`{ "data": [${data.join(',')}] }`);

        // resolve with the records inside a javascript object
        resolve(JSON.parse(json));
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

  // fetches endpoint + url
  return fetch(ENDPOINT + location, httpOptions)
    .then((response) => {
      // If response is 404 return a promise and instantly reject it with a 404 not found
      if (response.status === 404) {
        console.log('404 error: ', response);
        return new Promise((resolve, reject) => (reject({ error: '404 not found.' })));
      }

      // When the response doesn't have an error check for the content-type of the response
      const contentType = response.headers.get('content-type');

      // Parse the response depending on the content-type (supports: json, text and ndjson )
      switch (contentType) {
        case 'application/json':
          return response.json();
        case 'application/x-json-stream': // parse nd-json
          return parseNDJSON(response);
        default:
          return response.text();
      }
    })
    .catch((err) => {
      console.log('err:', err);
      return err;
    });
}
