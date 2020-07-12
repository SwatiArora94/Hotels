import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
var fetch = require('node-fetch')


const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

let initialState = {
  isFetching: true,
}

// server rendered home page
app.get('/', (req, res) => {
      fetch('https://us-central1-mmt-interview.cloudfunctions.net/helloWorld').then(response => response.json())
      .then(hotelData => {
        initialState.isFetching=false;
        initialState.hotels = hotelData;
        const { preloadedState, content}  = ssr(initialState)
        const respons = template("Server Rendered Page", preloadedState, content)
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        console.log("fetched");
        res.send(respons);
        res.end();
      });
});