const ENDPOINT = 'http://localhost:8080' // Development Endpoint
// const ENDPOINT = 'http://localhost:8000' // Production Endpoint

export function fetchServer(location, options = {}) {
  options = {
    ...options,
    mode: 'cors'
  }

  return fetch(ENDPOINT + location, options)
    .then((response) => {
      if (response.status == 404) {
        console.log('404 error: ', response);
      }
      return response;
    }, (response) => {
      console.log('fail response', response);
      return response;
    })
}
