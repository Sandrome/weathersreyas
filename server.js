const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '5931216f620d49d344b751d74ea3dc45';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })
  
  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${(5/9) * (weather.main.temp - 32)} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
          //res.json((5/9) * (weather.main.temp - 32));
        }
      }
    });
  })
  
  app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
  })