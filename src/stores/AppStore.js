
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  name: "____________",
  messages: [],
  counter: 0,
  weather: []
};

var AppStore = merge(EventEmitter.prototype, {
  
  getData: function(){
    return _data;
  },

  init: function() {
    if(localStorage.hasOwnProperty('name')) {
      _data.name = localStorage.getItem('name'); //here I set data name prop to what is in local storage if there a name prop
    }
    if(localStorage.hasOwnProperty('weather')) {
      _data.weather.push(localStorage.getItem('weatherId'));
      _data.weather.push(localStorage.getItem('tempC'));
      _data.weather.push(localStorage.getItem('tempF'));
    }
   /* if(localStorage.hasOwnProperty('counter')) {
      _data.counter = localStorage.getItem('counter');
    }*/
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything. Payload 
  var action = payload.action;//payload is the object of data coming from dispactcher //action is the object passed from the actions file

  if(action.actionType === "INSERTED_NAME") {
    localStorage.setItem('name', action.text);
    _data.name = action.text;
  }
  if(action.actionType === "NEW_MESSAGE") {
    var name = action.author;
    var text = action.data;
    _data.messages.push([name,text]);
    _data.counter++;
  }
  if(action.actionType === "WEATHER") {
    localStorage.setItem('tempC', action.tempC);
    localStorage.setItem('tempF', action.tempF);
    localStorage.setItem('weatherId', action.weatherId);
  }
  if(action.actionType === "MESSAGES_COUNT") {
    localStorage.setItem('readMessages', action.number);
  }

  AppStore.emitChange();//emit change event once action recieved and the data updated

});


module.exports = AppStore;