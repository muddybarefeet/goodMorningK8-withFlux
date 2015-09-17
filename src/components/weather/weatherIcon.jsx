var React = require('react');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');//execute file and then store it in the variable(importing code to use)

/*function getAppState(){
  return AppStore.getData().weather; //return object
}*/

var weatherIcon = React.createClass({
  
  getInitialState: function(){//default state for comonent (from store)
    return {
      currentWeather : AppStore.getData().weather
    };
  },

/*  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState(getAppState());
    //set state will always trigger the render method
  },*/
/*
  componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    AppStore.addChangeListener(this._onChange);
  },


  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },*/
  
  render: function(){
    //if and else statement here for different types of weather :)
    //if cloudy 700's
    //if sunny 800's
    //if rainy cloudy 801-803
    //if rain 300+500's
    //if thunder 200's
    //if snow 600's
    //if ALERT 900's
    
    return (
      
      <div>
        <i className="wi wi-night-sleet fa-2x"></i>

        <span>{this.state.currentWeather}&deg;C</span>
      </div>

      );
  }
});

module.exports = weatherIcon;