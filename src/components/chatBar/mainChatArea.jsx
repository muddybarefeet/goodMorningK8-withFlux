var React = require('react');


var typeMessageArea = require('./typeMessageArea.jsx');
var firebaseMessages = require('./firebaseMessages.jsx');


var chatArea = React.createClass({

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
        
        <div className="chatBar">
          <div onClick={this.offClick}>
            <i className="fa fa-comment-o fa-2x"></i>
          </div>
          <h2 ref="chatHead" className="yammerer header">Yammerer</h2>
          <firebaseMessages></firebaseMessages>
          <typeMessageArea></typeMessageArea>
        </div>
      
      
      );
    
    } else { //the button is false so the settings bar should be hidden

    return (
      <div>
        <i className="fa fa-comment-o fa-2x" onClick={this.clickOn}></i>
      </div>
      
      );
    }

  }

});

module.exports = chatArea;