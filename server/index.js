var express = require('express');
var app = express();
var getImage = require('./helpers/getImageNum.js');
var request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/imageNum', function(req, res) {
  var imgNo = getImage();
  res.type('application/json');
  res.send({
    imageNumber: imgNo
  });
});

app.get('/api/weather', function(req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;
  request("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon, function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }
    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    //All is good. Print the body
    var weatherObj = JSON.parse(body);
    var weatherId = weatherObj.weather[0].id;
    var avTemp = weatherObj.main.temp;
    res.send ({
      id:weatherId,
      temp:avTemp
    });
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at', host, port);
});

/* getWeatherData: function(lat,lon) {
    request("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon, this.recieveWeather);
  },*/