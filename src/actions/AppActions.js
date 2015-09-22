var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');

var myDataRef = new Firebase('https://arktuiknomq.firebaseio-demo.com/');
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  AppActions.recieveMessage(message);
});

//Request is an Async function, and doesn't return anything. So there's no point assigning to an invokation of request =)
//instead let's chuck it directly in your init function
var AppActions = {

  getLocation: function() { //triggered by?
    if (navigator.geolocation) {
      var that = this;

      navigator.geolocation.getCurrentPosition(function(pos){
        var strLat = pos.coords.latitude.toString();
        var strLon = pos.coords.longitude.toString();

        that.getWeatherData(pos.coords.latitude,pos.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },

  init: function() {
    return this.getLocation(); //array returned [lat,lon]
  },

  getWeatherData: function(lat,lon) {
    request("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon, AppActions.recieveWeather);
  },
  
  recieveWeather: function(err, res){
    if(!err) {
        var weatherObj = JSON.parse(res.body);
        var id;
        if(weatherObj.weather[0].id===804 || weatherObj.weather[0].id === 803) {
          id = 804;
        } else {
          id = Math.floor(weatherObj.weather[0].id/100)*100;
        }
        var averageTempC = Math.round((weatherObj.main.temp)-273.15); //average temp converted from kelvin to celcius
        var averageTempF = Math.round( ((((weatherObj.main.temp) - 273.15)* 1.8000)+32)  ); //kelvin to farenheight
        var exportObj = {
          tempC : averageTempC,
          tempF : averageTempF,
          weatherId : id
        };
        AppActions.newWeather(exportObj);
      }else{
        console.log('Failed to fetch weather: ', err);
      }
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
      tempC: weather.tempC,
      tempF: weather.tempF,
      weatherId: weather.weatherId
    });
  },

  localStorageSet: function(data) {
    AppDispatcher.handleStorageAction({
      actionType: "MESSAGES_COUNT",
      number: data
    });
  }

};


module.exports = AppActions;
