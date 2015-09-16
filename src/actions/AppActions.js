var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var messagesHome = require('../components/chatBar/firebaseMessages.jsx');

var myDataRef = new Firebase('https://arktuiknomq.firebaseio-demo.com/');
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  AppActions.recieveMessage(message);
});



/*function to to get request the weather from weather API
pass to newWeather*/


var AppActions = {

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
  }

  /*newWeather: function(weather) {
    AppDispatcher.handleWeatherAction({
      actionType: "WEATHER",
      temp: ,
      weatherId:
  */


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