import 'isomorphic-fetch';
import parseNDJSON from '../parseNDJSON';

export const HOST = process.env.REACT_APP_API_HOST;


export default class API {
  constructor({ host }) {
    this.host = host || HOST || '';
  }

  parseNDJSONFromResponse(response) {
    return new Promise((resolve, reject) => {
      response
        .text()
        .then(text => resolve(parseNDJSON(text)))
        .catch(err => reject(err));
    });
  }

  parseResponse(response) {
    // When the response doesn't have an error check for the content-type of the response
    const contentType = response.headers.get('content-type');

    // Parse the response depending on the content-type (supports: json, text and ndjson )
    switch (contentType) {
      case 'application/json':
        return response.json();
      case 'application/x-json-stream': // parse nd-json
        return this.parseNDJSONFromResponse(response);
      default:
        return response.text();
    }
  }

  fetch(location = '/', options = {}) {
    const httpOptions = {
      ...options,
    };

    // fetches endpoint + url
    return fetch(this.host + location, httpOptions)
      .then((response) => {
        // If response is 404 return a promise and instantly reject it with a 404 not found
        if (response.status === 404) {
          return new Promise((resolve, reject) => (reject({ error: '404 not found.' })));
        }

        return this.parseResponse(response);
      })
      .catch(err => err);
  }
}
