
var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */

   //standardized the object passed to the store
   //tells us/store where the action originated e.g.user/server
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  handleFirebaseAction: function(action) {
    this.dispatch({
      source: 'FIREBASE_ACTION',
      action: action
    });
  },

  handleServerWeather: function(action) {
    this.dispatch({
      source: 'WEATHER',
      action: action
    });
  },

  handleStorageAction: function(action) {
    this.dispatch({
      source: 'STORAGE_ACTION',
      action: action
    });
  },

  handleGoogleAPIAction: function(action) {
    this.dispatch({
      source: 'GOOGLE_API',
      action: action
    });
  },

  handleServerImage: function(action) {
    this.dispatch({
      source: 'DAY_IMAGE',
      action: action
    });
  }

});

module.exports = AppDispatcher;