
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  number:0
};

var AppStore = merge(EventEmitter.prototype, {
  
  getData: function(){
    return _data;
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

AppDispatcher.register( function (payload){ //'subscribes' to the dispatcher. Store wants to know if it does anything.
  var action = payload.action;

  if(action.actionType === "NAME_BUTTON_CLICK") {
    //show the bar needed
  }

  AppStore.emitChange();//emit change event once action recieved and the data updated

});



module.exports = AppStore;