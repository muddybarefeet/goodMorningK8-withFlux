var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');

var myDataRef = new Firebase('https://arktuiknomq.firebaseio-demo.com/');
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  AppActions.recieveMessage(message);
});


var weather = request('http://api.openweathermap.org/data/2.5/weather?lat=37.7749295&lon=-122.4194155', function w(er, res) {
  if(!er) {
    var weatherObj = JSON.parse(res.body);
    var id = weatherObj.weather[0].id;
    var averageTempCelc = Math.round((weatherObj.main.temp)-273.15); //average temp converted from kelvin to celcius
    //var averageTempFar = Math.round( ((((weatherObj.main.temp) - 273.15)* 1.8000)+32)  );
    var exportObj = {
      temp : averageTempCelc,
      weatherId : id
    };
    console.log('weather running');
    AppActions.newWeather(exportObj);
  }
});

var AppActions = {

  init: function() {
    return weather;
  },

  exampleAction: function(text){ //sends object to dispatcher with details about it in an object
    AppDispatcher.handleViewAction({
      actionType: AppConstants.EXAMPLE_CONSTANT,
      text: text + ' from Actions'
    });
  },

  nameEnter: function(newName) {
    AppDispatcher.handleViewAction({
      actionType: "INSERTED_NAME",
      text: newName //want to get the text from my input box
    });
  },

  recieveMessage: function(message) {
    AppDispatcher.handleFirebaseAction({
      actionType: "NEW_MESSAGE",
      data: message.text,
      author: message.name
    });
  },

  sendMessage: function(message){
    myDataRef.push(message);
  },

  newWeather: function(weather) {
    AppDispatcher.handleWeatherAction({
      actionType: "WEATHER",
      temp: weather.temp,
      weatherId: weather.weatherId
    });
  }

/*
  getLocation: function() { //triggered by?
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos);
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }*/


};


module.exports = AppActions;