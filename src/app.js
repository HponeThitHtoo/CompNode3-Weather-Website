const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/* console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public')); */

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // set express to hbs view engine
app.set('views', viewsPath); // set express to views folder path
hbs.registerPartials(partialsPath); // set partials folder path

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/* app.get('/help', (req, res) => {
  // res.send({
  //   name: 'Andrew',
  //   age: 27,
  // });
  res.send([{
    name: 'Andrew'
  }, {
    name: 'Sarah'
  }]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>');
}); */

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis provident suscipit soluta impedit aliquid tenetur sed assumenda architecto dignissimos veritatis nihil nemo corrupti quae deleniti rerum nam rem, eum eius!',
    title: 'Help',
    name: 'Andrew Mead',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address:req.query.address,
      });
    });
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

// setting 404 page for /help/* routes
app.get('/help/*', (req, res) => {
  res.render('404', { 
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found.',
  });
});

// setting 404 page and all unexisted routes
app.get('*', (req, res) => {
  res.render('404', { 
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});