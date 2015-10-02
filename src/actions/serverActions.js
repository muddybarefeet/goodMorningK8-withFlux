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
        strLat = pos.coords.latitude.toString();
        strLon = pos.coords.longitude.toString();
        that.getWeatherData(strLat,strLon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },

  getWeatherData: function(lat,lon) {
    request('http://localhost:3000/api/weather?lat=37.7833&lon=122.4167', this.recieveWeather);
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
    var id = weatherObj.id;
    if(id===804 || id === 803) {
      id = 804;
    } else {
      id = Math.floor(id/100)*100;
    }

    var temp = weatherObj.temp;
    var averageTempC = Math.round((temp)-273.15); //average temp converted from kelvin to celcius
    var averageTempF = Math.round( ((((temp) - 273.15)* 1.8000)+32)  ); //kelvin to farenheight


    var exportObj = {
      tempC : averageTempC,
      tempF : averageTempF,
      weatherId : id
    };

    this.sendWeatherReq(exportObj);
  },

  sendWeatherReq: function(weatherObj) {
    AppDispatcher.handleServerWeather({
      actionType: "WEATHER",
      id: weatherObj.weatherId,
      tempC: weatherObj.tempC,
      tempF: weatherObj.tempF
    });
  }

};


module.exports = ServerActions;
