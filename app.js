const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//hbs.registerPartials(__dirname + '/views/partials');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

//app.use(express.static('public'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Home'
  });
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi[0]);
  res.render('beers', {
    beersFromApi,
    pageTitle: 'Beers'
  })
  })
})


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeerFromApi => {
    console.log(randomBeerFromApi[0]);
  res.render('randomBeer', {
    randomBeerFromApi,
   pageTitle: 'Random Beer'
  })
})
})

app.listen(3000, () => console.log('🏃‍ on port 3000'))


