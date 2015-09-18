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
  weatherIcon: function(id) {
    var weatherObj = {

      200: 'wi wi-storm-showers fa-2x',
      300: 'wi wi-showers fa-2x',
      500: 'wi wi-rain fa-2x',
      600: 'wi wi-snow fa-2x',
      700: 'wi wi-cloudy fa-2x',
      800: 'wi wi-day-sunny fa-2x',
      804: 'wi wi-day-cloudy fa-2x',
      900: 'fa fa-exclamation-triangle fa-2x'
    };

    return weatherObj[id];
  },
  
  render: function(){

      return (
     
      <div>
        <i className={this.weatherIcon(this.state.currentWeather[0])}></i>
        <span className="celcius">{this.state.currentWeather[1]}&deg;C/</span><span className="farenheight">{this.state.currentWeather[2]}&deg;F</span>
      </div>

      );
  }
});

module.exports = weatherIcon;