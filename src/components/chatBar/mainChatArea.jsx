var React = require('react');


var typeMessageArea = require('./typeMessageArea.jsx');
var firebaseMessages = require('./firebaseMessages.jsx');


var chatArea = React.createClass({

  getInitialState: function() { //set initial state to false
      return {
          isSelected: false
      };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    this.render();
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

      var windowHeight = window.innerHeight;
    /*  var topHeight = Math.round(windowHeight/5); //1/5 of window height
      var bottomHeight = Math.round(windowHeight/5); //1/5 of window height
      var messageBoxHeight = Math.round((windowHeight/5)*3); //3/5 of window height, i.e., what's left over*/

      return (
        
        <div className="chatBar">
          <div onClick={this.offClick}>
            <i className="fa fa-comment-o fa-2x"></i>
          </div>
          <h2 ref="chatHead" className="yammerer header" /*componentHeight={topHeight}*/>Yammerer</h2>
          <firebaseMessages /*componentHeight={messageBoxHeight}*/></firebaseMessages>
          <typeMessageArea /*componentHeight={bottomHeight}*/></typeMessageArea>
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