
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  numberLeft: 0,
  numberMiddle: 0,
  numberRight: 0
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

  if(action.actionType === AppConstants.EXAMPLE_CONSTANT){
    var text = action.text + ' to Dispatcher to Store and back';
    _data.message = text;
  } else if(action.actionType === "LEFT_SIDE_CLICK") {
    _data.numberLeft+=1;
  } else if(action.actionType === "MIDDLE_CLICK") {
    _data.numberMiddle+=1;
  } else if(action.actionType === "RIGHT_SIDE_CLICK") {
    _data.numberRight+=1;
  }

  AppStore.emitChange();//emit change event once action recieved and the data updated

});



module.exports = AppStore;