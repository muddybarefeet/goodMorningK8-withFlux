var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('browser-request');
var moment = require('moment');

var ServerActions = {

  strLat:null,
  strLon:null,

  init: function() {
    this.getImageNum();
    this.getLocation();
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
  },

  getLocation: function() {
    if (navigator.geolocation) {
      var that = this;
      navigator.geolocation.getCurrentPosition(function(pos){
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        that.getWeatherData(lat,lon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },

  getWeatherData: function(lat,lon) {
    request('http://localhost:3000/api/weather?lat='+lat+'&lon='+lon, this.recieveWeather);
  },

  recieveWeather: function(err,resp) {
    if(!err) {
      var response = JSON.parse(resp.response);
      ServerActions.formatWeather(response);
    } else {
      console.log(err);
    }
  },

  formatWeather: function(weatherObj) {
    var tempCurr = weatherObj.currentTemp;
    var tempMax = weatherObj.max;
    var exportObj = {
      icon: weatherObj.icon,
      tempCurr : Math.round(tempCurr),
      tempMax : Math.round(tempMax)
    };
    this.sendWeatherReq(exportObj);
  },

  sendWeatherReq: function(weatherObj) {
    AppDispatcher.handleServerWeather({
      actionType: "WEATHER",
      icon: weatherObj.icon,
      tempMax: weatherObj.tempMax,
      tempCurr: weatherObj.tempCurr
    });
  }

};


module.exports = ServerActions;
