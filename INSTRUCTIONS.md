# Instructions to Run the App
First install the packages:

```
npm install
```
### Running Production Build
To run the deploy version first you have to configure the API, go to `/src/api/components/api/index.js` and select the production endpoint like this:
```
// const ENDPOINT = 'http://localhost:8080'; // Dev Endpoint
const ENDPOINT = 'http://localhost:8000'; // Production Endpoint
```
After this build the project into a bundle with:
```
npm run build
```
Webpack will generate the bundle under `/static` folder then you can start the server with:
```
npm start
```
Then access to the app in your browser through `http://localhost:8000`

### Running Developent Server
Similar to the past step you have to configure the API module this time to use the Dev Enpoint

Then run `npm run dev`, this will run the node server in `http://localhost:8000` and the webpack-dev-server on `http://localhost:8080`.

To access the app while runing the dev-server just go to `http://localhost:8080`.

Http requests to `/ad` and `/api` will be redirected to the node server.

### Final Notes
There is still a lot of code I could not cover with tests, I think with more time I could have added tests to cover the row rendering on the InfiniteScrollGrid Component

Also found a little issue where the server is returning the same cat image in a row, even if the 2 ids are totally different. I think this could be because there are repeated images with different ids on the place kitten api.
