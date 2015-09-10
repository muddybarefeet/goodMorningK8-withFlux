
var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');//execute file and then store it in the variable(importing code to use)
var backgroundImage = require('./backGroundImage.jsx');
var clock = require('./mainText/clock.jsx');
var greet = require('./mainText/greeting.jsx');
var name = require('./mainText/name.jsx');
var nameButton = require('./settingsBar/nameButton.jsx');


function getAppState(){
  return AppStore.getData();
}

var APP = React.createClass({
  getInitialState: function(){//default state for comonent (from store)
    return getAppState();
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState(getAppState());
    //set state will always trigger the render method
  },

  componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },

  handleClick: function(args){

    if(args === 'nameButton') {
      this.setState({
        //set the state of the button to show a text area to put your name
    });
    } 

  },
  
  render: function(){
    //put button on the screen again with the new state
    return (
      
      <div>

        <div style={{marginTop:'300px', textAlign:'center'}}>
           <backgroundImage></backgroundImage>
           <clock></clock>
           <greet></greet>
           <name></name>
        </div>

        <nameButton onClick={this.handleClick.bind(this,"nameButton")}></nameButton>

      </div>

      );
  }
});

module.exports = APP;