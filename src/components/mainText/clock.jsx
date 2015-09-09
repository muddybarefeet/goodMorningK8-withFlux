
var React = require('react');

var Clock = React.createClass({

  intervalRef: null,
  hours: null,
  time: null,

  getTime : function() {
    hours = new Date().getHours().toString();
    var mins = new Date().getMinutes().toString();

    hours = hours.length===1 ? '0'+hours : hours;
    mins = mins.length===1 ? '0'+mins : mins;
    
    time = hours + ':' + mins;

    return time;
  },

  getInitialState: function(){//default state for comonent (from store)
    return {
      currentTime : this.getTime()
    };
  },

  componentDidMount: function(){
    var that = this;
    this.intervalRef = setInterval( function() {
      if(that.state.currentTime !== that.getTime()) {
        that.setState({
          currentTime: that.getTime()
        });
      }
    },1000); //could do .bind(this) instead of the that=this!
  },

  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    clearInterval(this.intervalRef);
  },
  
  render: function(){
    //put button on the screen again with the new state
    return (
      <div style={{
          fontFamily:'arial',
          fontSize:'70px',
          color:'orange',
          fontWeight:'bold'
        }}>{this.state.currentTime}</div>
      );
  }
});

module.exports = Clock;