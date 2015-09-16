var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var actions = require('../../actions/AppActions');
//var mainChatArea = require('./mainChatArea.jsx');

/*function getAppState(){
  return AppStore.getData();
}*/

var messageInput = React.createClass({

  getInitialState: function(){//default state for comonent (from store)
    return {
      userMessage: "" //want it to be an empty text box unless type in 
    };
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

  handleChange: function(e){
    if(e.key === 'Enter'){
      //send an action and update the stores
      var message = this.state.userMessage;
      var toPass = {
        name: null,
        text: null
        };
      toPass.name = localStorage.getItem('name');
      toPass.text = this.state.userMessage;
      console.log(toPass);

      actions.recieveMessage(toPass); //pass the state to the actions function nameChange when enter key hit.
      
    } else {
      var inputNode = this.refs.messageUser.getDOMNode();//this gets you a reference to the element that has the ref myInput
      var value = inputNode.value;
      this.setState({userMessage: value});
    }
  },
  
  render: function(){
    //put button on the screen again with the new state
    return (
      
      <div>
        <textarea ref="messageUser" className="messageInput" 
        onKeyUp={this.handleChange} 
        /*style={{height: this.props.componentHeight}}*/></textarea> 
      </div>

      );
  }
});

module.exports = messageInput;