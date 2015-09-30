var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');
var moment = require('moment');

var ServerActions = {

  init: function() {
    this.getImageNum();
  },

  getImageNum: function() {

    request("http://localhost:3000/api/imageNum", this.recieveImageNum);

  },

  recieveImageNum: function(err, resp) {
    if(!err) {
      var respObjStr = resp.body;
      var respObj = JSON.parse(respObjStr);
      ServerActions.sendImgReq(respObj);
    } else {
      console.log(err);
    }
  },

  sendImgReq: function(numObj) {
    AppDispatcher.handleServerImage({
      actionType: "DAY_IMAGE",
      num: numObj.imageNumber
    });
  }

};


module.exports = ServerActions;
