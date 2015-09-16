var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');//execute file and then store it in the variable(importing code to use)

function getAppState(){
  return AppStore.getData().weather;
}

var weatherIcon = React.createClass({
  
  getInitialState: function(){//default state for comonent (from store)
    return getAppState();
  },

/*  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState(getAppState());
    //set state will always trigger the render method
  },*/

/*  componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    AppStore.addChangeListener(this._onChange);
  },
*/

/*  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },*/
  
  render: function(){
    //if and else statement here for different types of weather :)
    //if cloudy
    //if sunny
    //if rainy cloudy
    //if rain
    //if thunder
    //if snow
    //if ALERT
    
    return (
      
      <div>
      </div>

      );
  }
});

module.exports = weatherIcon;