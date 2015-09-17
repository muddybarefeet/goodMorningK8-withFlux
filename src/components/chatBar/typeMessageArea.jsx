var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var actions = require('../../actions/AppActions.js');

/*function getAppState(){
  return AppStore.getData();
}*/

var messageInput = React.createClass({

  getInitialState: function(){//default state for comonent (from store)
    return {
      userMessage: "" //want it to be an empty text box unless type in 
    };
  },

  handleChange: function(e){
    if(e.key === 'Enter'){
      //send an action and update the stores
      //function
      this.refs.messageUser.getDOMNode().value = "";//EMPTIES TEXT AREA WHEN ENTER HIT
      var message = this.state.userMessage;
      var toPass = {
        name: null,
        text: null
      };
      toPass.name = localStorage.getItem('name');
      toPass.text = this.state.userMessage;
      actions.sendMessage(toPass); //pass the state to the actions function nameChange when enter key hit.
    } else {
      var inputNode = this.refs.messageUser.getDOMNode();//this gets you a reference to the element that has the ref myInput
      var value = inputNode.value;
      this.setState({userMessage: value});
    }
  },
  
  render: function(){
    //put button on the screen again with the new state
    return (
      
      <div className="divMessStyle">
        <textarea ref="messageUser" className="messageInput"
        onKeyUp={this.handleChange} 
        style={{height: this.props.componentHeight}}></textarea> 
      </div>

      );
  }
});

module.exports = messageInput;