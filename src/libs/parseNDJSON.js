export default function parseNDJSON(text) {
  // get an array of json object strings from the server
  const data = text.split('\n');

  // remove the empty string at the end of the array
  data.splice(-1);

  // joins all the json records in a JSON string wrapped by an array and parse it
  return JSON.parse(`{ "response": [${data.join(',')}] }`).response;
}
