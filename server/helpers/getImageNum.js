//not use browerify becuase it is not for the browser it is written in node and can use browserify, 
//in others can use require because using browserfy
var moment = require('moment');

var changeImage = function() {
  var startTime = new Date(2015, 07, 30); //set a start date variable for the first september(tomorrow)
  var timeNow = new Date(); //time now
  //find the difference between them:
  var ms = moment(startTime,"DD/MM/YYYY HH:mm:ss").diff(moment(timeNow,"DD/MM/YYYY HH:mm:ss"));
  var timeDiff = moment.duration(ms);//calculation
  var daysPassed = Math.floor(timeDiff.asDays());//gives the hours passed since startTime
  daysPassed = Math.abs(daysPassed);
  //I want a new picture every day at midnight 
  //clever way to never get to the end of the images list!
  return daysPassed%17;
};

module.exports = changeImage;