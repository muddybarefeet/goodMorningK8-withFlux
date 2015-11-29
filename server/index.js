var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

var getImage = require('./helpers/getImageNum.js');
var db = require('./services/db/index.js'); //trigger the knex database

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(express.bodyParser());
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

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
  request("https://api.forecast.io/forecast/2f8efe741324bd670c91c4cd593a4062/"+lat+","+lon+'?units=si', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error weather:', error);
    }
    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    //All is good. Print the body
    var usefulData = JSON.parse(response.body);
    var tempMax = usefulData.daily.data[0].temperatureMax;
    var tempCurr = usefulData.currently.temperature;
    res.send ({
      icon: usefulData.currently.icon,
      currentTemp: tempCurr,
      max: tempMax
    });
  });
});

//create user
app.post('/api/users', function (req, res) {

  var packet = req.body;
  db.users.create( packet.email, packet.username, packet.password)
  .then(function (data) {
    res.status(200).json();
  })
  .catch(function (err) {
    res.status(500).json();
  });

});

//check password
app.post('/api/checkPassword', function (req, res) {

  var packet = req.body;
  db.users.checkPassword(packet.email, packet.password)
  .then(function (data) {
    if (data) {
      res.status(200).json({message: 'Correct password'});
    }
  })
  .catch(function (err) {
    res.status(403).json({message: 'Incorrect password'});
  });

});

//get all the messages to or from one user
app.get('/api/messages/:userEmail', function(req, res) {

  var email = req.params.userEmail;
  db.messages.getMessages(email)
  .then(function(data) {
    return res.send(data);
  })
  .catch(function (err) {
    res.status(500).json({message: 'Unable to get users messages'});
  });

});

//post things to database
app.post('/api/messages', function(req, res) {
  var packet = req.body;
  //to be added to the client when sending POST
  db.messages.addMessage(packet.message, packet.from, packet.to)
  .then(function(data) {
    return res.send(data);
  })
  .catch(function (err) {
    res.status(500).json();
  });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at', host, port);
});