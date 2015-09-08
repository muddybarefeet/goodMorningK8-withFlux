var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  exampleAction: function(text){ //sends object to dispatcher with details about it in an object
    AppDispatcher.handleViewAction({
      actionType: AppConstants.EXAMPLE_CONSTANT,
      text: text + ' from Actions'
    });
  },

  leftSide: function() {
    AppDispatcher.handleViewAction({
      actionType: "LEFT_SIDE_CLICK"
    });
  },

  rightSide: function() {
    AppDispatcher.handleViewAction({
      actionType: "RIGHT_SIDE_CLICK"
    });
  },

  middle: function() {
    AppDispatcher.handleViewAction({
      actionType: "MIDDLE_CLICK"
    });
  }

};


module.exports = AppActions;