
var React = require('react');
var currentTime = require('./clock.jsx');


var Greeting = React.createClass({
  //function to make greeting
  intervalRef: null,

  mornOrArvo: function(num) {
    if(num<12) {
      return "Good Morning";
    } else if(num<16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  },

  getInitialState: function(){//default state for comonent (from store)
    return {
      currentGreeting : this.mornOrArvo()
    };
  },

  componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    var that = this;
    this.intervalRef = setInterval( function() {
      //check the hours in the function
      if(that.state.currentGreeting !== that.mornOrArvo(hours)) {
        that.setState({
          currentGreeting: that.mornOrArvo(hours)
        });
      }
    },1000); //could do .bind(this) instead of the that=this!
  },

  componentWillUnmount: function(){
    clearInterval(this.intervalRef);
  },
  
  render: function(){
    //put button on the screen again with the new state
    return (
        <div style={{
          fontFamily:'arial',
          fontSize:'60px',
          color:'white',
          fontWeight:'bold'
        }}>{this.state.currentGreeting}</div>
      );
  }
});

module.exports = Greeting;