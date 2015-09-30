
var React = require('react');
var actions = require('../../actions/AppActions');
var changeName = actions.changeName;
var calendar = require('./calendar.jsx');


var nameButton = React.createClass({
  
  getInitialState: function() { //set initial state to false
      return {
          isSelected: false
      };
  },
   
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
          <h2 className="header">This Week:</h2>
            <calendar></calendar>
          <section>
            <div onClick={this.offClick} >
              <i className="fa fa-calendar fa-2x"></i>
            </div>
          </section>
        </div>
      
      
      );
    
    } else { //the button is false so the settings bar should be hidden

    return (
      <div>
        <i className="fa fa-calendar fa-2x" onClick={this.clickOn}></i>
      </div>
      
      );
    }

  }

});

module.exports = nameButton;