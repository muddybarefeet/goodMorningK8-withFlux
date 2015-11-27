var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');
var moment = require('moment');


//Request is an Async function, and doesn't return anything. So there's no point assigning to an invokation of request =)
//instead let's chuck it directly in your init function
var AppActions = {

  nameEnter: function(newName) {
    AppDispatcher.handleViewAction({
      actionType: "INSERTED_NAME",
      text: newName //want to get the text from my input box
    });
  },
  
  newWeather: function(weather) {
    AppDispatcher.handleWeatherAction({
      actionType: "WEATHER",
      tempC: weather.tempC,
      tempF: weather.tempF,
      weatherId: weather.weatherId
    });
  },

  // localStorageSet: function(data) {
  //   AppDispatcher.handleStorageAction({
  //     actionType: "MESSAGES_COUNT",
  //     number: data
  //   });
  // }

};


module.exports = AppActions;
