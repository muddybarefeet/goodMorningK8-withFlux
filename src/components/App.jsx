
var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var redBox = require('./redBox.jsx');


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

    if(args === 'buttonLeft') {
      AppActions.leftSide(); //trigger action
    } else if(args === 'buttonMiddle') {
      AppActions.middle();
    } else if(args === 'buttonRight') {
      AppActions.rightSide();
    }

  },
  
  render: function(){
    //var divStyle = {height: 10}; // rendered as "height:10px"
    //put button on the screen again with the new state
    return (
      
      <div>
        <button onClick={this.handleClick.bind(this,'buttonLeft')}>{this.state.numberLeft}</button>
        <button onClick={this.handleClick.bind(this,'buttonMiddle')}>{this.state.numberMiddle}</button>
        <button onClick={this.handleClick.bind(this,'buttonRight')}>{this.state.numberRight}</button>
         <redBox></redBox>
      </div>
      
      );
  }
});

module.exports = APP;