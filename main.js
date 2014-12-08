var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

var API_PATH = 'http://api.wunderground.com/api/';
var API_KEY = 'e6e94134dc4c1c19';

app.use('/', express.static(path.join(__dirname, 'public'))); //can use files in / endpoint

app.get('/api/gendata', function(req, res) {
  var zip = req.query.zip;
  var regex = new RegExp("^\\d{5}(-\\d{4})?$");
  if (!zip.match(regex)) {
    return res.status(400).send('Invalid zip code. Please enter again.');
  }
  var zipUrl = API_PATH + API_KEY + '/geolookup/q/' + zip + '.json';
  request(zipUrl, function (zipError, zipResponse, body) {
    var zipBody = JSON.parse(body);
    if (!zipError && zipBody.location) {
      var city = zipBody.location.city;
      var state = zipBody.location.state;
      var forecastCityUrl = API_PATH + API_KEY + '/forecast/q/' + state + '/' + city + '.json';

      request(forecastCityUrl, function (forecastError, forecastResponse, forecast) {
        var forecastObj = JSON.parse(forecast);
        if (!forecastError && forecastObj.forecast) {
          var data = {};
          data.city = city;
          data.state = state;
          data.forecast = forecastObj.forecast;
          res.status(200).json(data);
        } else {
          res.status(404).send(forecastBody.response.error.description);
        }
      });

    } else {
      res.status(404).send(zipBody.response.error.description);
    }
  });
});


var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Now listening at: ' + host + ':' + port);
});
