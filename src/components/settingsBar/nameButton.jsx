
var React = require('react');
var actions = require('../../actions/AppActions');
var changeName = actions.changeName;
var nameInput= require('./textArea.jsx');


var nameButton = React.createClass({
  
    getInitialState: function() { //set initial state to false
        return {
            isSelected: false
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
    if(this.state.isSelected === true) { //if the state is true
      //show the hidden 
    }
  },*/

/*  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },*/
   
  clickOn: function() {
      this.setState({
          isSelected: true //when the button is clicked then the state is true
      });
  },

  offClick: function() {
     this.setState({
          isSelected: false
      });
  },
  
  render: function(){
    if(this.state.isSelected === true) {

      return (
        
        <div className="settingsBar">
          <h2 className="header">Settings</h2>
          <section>
            <p className="yourNameAsk">Your Name</p>
            <nameInput /*changeName={changeName}*/></nameInput>
             <div onClick={this.offClick} >
              <i className="fa fa-cogs fa-2x" onClick={this.clickOn}></i>
            </div>
          </section>
        </div>
      
      
      );
    
    } else { //the button is false so the settings bar should be hidden

    return (
      <div>
        <i className="fa fa-cogs fa-2x" onClick={this.clickOn}></i>
      </div>
      
      );
    }

  }

});

module.exports = nameButton;