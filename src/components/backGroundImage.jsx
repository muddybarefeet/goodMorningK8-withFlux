
var React = require('react');
var moment = require('moment');
//var pics = require('../stores/backgroundImages');

var backgroundImage = React.createClass({

  imageNum: null,
  intervalRef:null,

  changeImage: function() {
    var startTime = new Date(2015, 07, 30); //set a start date variable for the first september(tomorrow)
    var timeNow = new Date(); //time now
    //find the difference between them:
    var ms = moment(startTime,"DD/MM/YYYY HH:mm:ss").diff(moment(timeNow,"DD/MM/YYYY HH:mm:ss"));
    var timeDiff = moment.duration(ms);//calculation
    var daysPassed = Math.floor(timeDiff.asDays());//gives the hours passed since startTime
    //I want a new picture every day at midnight 
    //clever way to never get to the end of the images list!
    imageNum = daysPassed%13;
    //return //what return?!
  },

  getInitialState: function(){//default state for comonent (from store)
    return {
      currentBackground : this.changeImage()
    };
  },

  componentDidMount: function(){
    var that = this;
    this.intervalRef = setInterval(function() {
      if(changeImage() !== imageNum) {
        that.setState({
          currentBackground: that.changeImage()
        });
      }
    },3600000); //check every hour
  },


  
  render: function(){
    return (
      <div>
        <div style={{
          backgroundImage:'url(assets/backgroundImages/'+imageNum+'.jpg)', //EWWWWWWW
          width:"100%",
          height:"100%",
          backgroundSize:'cover',
          position:'absolute',
          top:'0',
          left:'0',
          zIndex:'-1'
        }}>{this.state.currentBackground}</div>
      </div>
      
    );
  }
});

module.exports = backgroundImage;