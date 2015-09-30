var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');
var moment = require('moment');

var myDataRef = new Firebase('https://u9h6b5fzqgo.firebaseio-demo.com/');
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  AppActions.recieveMessage(message);
});
//initiated by library load
var checkAuth = function () {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true //WHY??
    }, handleAuthResult);
};

//Request is an Async function, and doesn't return anything. So there's no point assigning to an invokation of request =)
//instead let's chuck it directly in your init function
var AppActions = {

  strLat:null,
  strLon:null,
  CLIENT_ID:'525119639464-ec7ul4h2mpceqp59r24rbd0j64t56ovl.apps.googleusercontent.com',
  SCOPES: ["https://www.googleapis.com/auth/calendar.readonly"],

  init: function() {
    return this.getLocation();
  },

  handleAuthClick: function (event) { //send off thing to google to authaurze
    gapi.auth.authorize(
      {client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false},AppActions.handleAuthResult);
    return false;//WHY??
  },

  handleAuthResult: function(authResult) { //authResult needs to be passed from COMPONENTS
    if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
      AppActions.loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by clicking authorize button.
     // authorizeDiv.style.display = 'inline'; DO I NEED AN ELSE?? MAYBE JUST CONSOLE.LOG PROBLEM HERE??
     console.log('Not authorized');
    }
  },

  loadCalendarApi: function() {
    gapi.client.load('calendar', 'v3', this.listUpcomingEvents);
  },

  listUpcomingEvents: function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) { //object with desired information
      var events = resp.items; //array of objects showing events
      var calNote = {};
      var name = resp.summary.split('@');
      name = name[0];
      AppActions.nameEnter(name); //set the name to the username
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
            var what = events[i];
            var date = what.start.dateTime;
            var when = what.start.dateTime;
            if (!when) {
              when = what.start.date;
            }
            var happening = when.toString();
            happening = happening.replace('T',' ');
            var today = new Date();
            var inAWeek = moment(today).add(7, 'days');
            inAWeek = inAWeek._d;
            console.log('hap:',new Date(happening));
            console.log('inAWeek:',inAWeek);
            if(moment(happening).isBefore(inAWeek) === true) { //show those within a weeks time!
              happening = moment(happening).calendar();
              calNote[i] = [happening+':'+"\n"+what.summary];
            }
        }
        AppActions.calendarReq(calNote);
      } else {
        console.log('No upcoming events found.');
      }

    });
  },

  calendarReq: function(calEntry) {
    AppDispatcher.handleGoogleAPIAction({
      actionType: "CALENDAR_REQUEST",
      text: calEntry
    });
  },

  getLocation: function() {
    if (navigator.geolocation) {
      var that = this;

      navigator.geolocation.getCurrentPosition(function(pos){
        strLat = pos.coords.latitude.toString();
        strLon = pos.coords.longitude.toString();
        that.getWeatherData(pos.coords.latitude,pos.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },

  getWeatherData: function(lat,lon) {
    request("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon, this.recieveWeather);
  },
  
  recieveWeather: function(err, res){
    var that = this;
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
