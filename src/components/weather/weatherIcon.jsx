var React = require('react');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');//execute file and then store it in the variable(importing code to use)


var weatherIcon = React.createClass({
  
  getInitialState: function(){//default state for comonent (from store)
    return {
      currentWeather : AppStore.getData().weather
    };
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState({
      currentWeather : AppStore.getData().weather
    });
    //set state will always trigger the render method
  },

  componentDidMount: function(){
      AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },

  weatherIcon: function(id) {
    var forecastOptions = {
      clear_day: "wi-day-sunny",
      clear_night: "wi-night-clear",
      rain: "wi-rain",
      snow: "wi-snow",
      sleet: "wi-sleet",
      wind: "wi-strong-wind",
      fog: "wi-fog",
      cloudy: "wi-cloudy",
      "partly-cloudy-day": "wi-day-cloudy",
      "partly-cloudy-night": "wi-night-cloudy",
    };
    return forecastOptions[id];
  },
  
  render: function(){
// console.log('WEATHER', this.weatherIcon(this.state.currentWeather[0]));
      return (
     
      <div>
        <i className={"wi "+this.weatherIcon(this.state.currentWeather[0])+" fa-2x"}></i>
        <span className="currentT">{this.state.currentWeather[1]}/</span><span className="maxT">{this.state.currentWeather[2]}&deg;C</span>
      </div>

      );
  }
});

module.exports = weatherIcon;