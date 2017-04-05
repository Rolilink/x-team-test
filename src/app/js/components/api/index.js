const ENDPOINT = 'http://localhost:8080'; // Development Endpoint
// const ENDPOINT = 'http://localhost:8000'; // Production Endpoint

export default function fetchServer(location, options = {}) {
  const httpOptions = {
    ...options,
  };

  return fetch(ENDPOINT + location, httpOptions)
    .then((response) => {
      if (response.status === 404) {
        console.log('404 error: ', response);
      }
      return response;
    }, (response) => {
      console.log('fail response', response);
      return response;
    });
}
