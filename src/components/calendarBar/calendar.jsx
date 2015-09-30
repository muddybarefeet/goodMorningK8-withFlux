/*this is where I will render my calendar request for info to be in actions*/
var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var actions = require('../../actions/AppActions.js');

function getAppState(){
  return AppStore.getData().calendar;
}

var calendar = React.createClass({

  getInitialState: function(){
    return {
      auth: false,
      userCalendar: []
    };
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState({
      userCalendar: getAppState()
    });
  },

  componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },

  onClick: function(e) {
    //sends click to actions
    actions.handleAuthClick();
    this.setState({
      auth:true
    });
  },

 render: function(){

  if(this.state.auth === false) {
    return (
      <div>
          <button className="googleB" onClick={this.onClick}>Log In</button>
      </div>
    );
  } else {
    var dates = this.state.userCalendar;
    var renderedMessages = dates.map(function(element, index, array){

      return (
        <li className="listItems" key={index}>{element}</li> 
      );    
    });

    return ( 
      <ul >{renderedMessages}</ul> 
    ); 
  }

  }
});

module.exports = calendar;
