var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var actions = require('../../actions/AppActions');
var typeMessageArea = require('./typeMessageArea.jsx');
//var mainChat = require('./mainChatArea.jsx');

function getAppState(){
  var data = AppStore.getData().messages;
  return data;
}

var firebaseMessages = React.createClass({

  getInitialState: function(){//default state for comonent (from store)
    return {
      messages: getAppState(),
      componentHeight: window.innerHeight-(260)
    };
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    var newMessages = getAppState();
    this.setState({
      messages: getAppState(),
      componentHeight: window.innerHeight-(260) //subtract the header and footer
    });
  },

 componentDidMount: function(){
    //add event change listener to app store. tell the store to invoke the onChange function when change occurs
    window.addEventListener('resize', this._onChange);
    AppStore.addChangeListener(this._onChange);
  },
 
  componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', this._onChange);
  },

  componentDidUpdate: function() {
    var node = this.refs.messageScroll.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },

  render: function(){ //render functio 
  
  //variable which returns a list item for each array in my array of messages
      var that = this;
      var msgsToDisplay = this.state.messages.length !== 0 ? this.state.messages : [['Currently out gathering messages, I will be with you shortly!']];

      var renderedMessages = msgsToDisplay.map(function(element, index, array){
        var diff = that.props.unread;

        if(diff > 0) {
          var toRemFrom = that.state.messages.length-(diff+1);
          if(index > toRemFrom) {
            return (
              <li key={index} className="redFont">{element}</li> 
            );
          } else {
            return (
              <li key={index} >{element}</li> 
            );
          }
        } else {
          return (
              <li key={index} >{element}</li> 
          );
        }
      }/*.bind(this)*/);

        return ( // render the messages in the ul 

          <ul ref="messageScroll" className="messagesRoll messageFormat" style={{height: this.state.componentHeight}} >{renderedMessages}</ul> 

        ); 
  

  }

});

module.exports = firebaseMessages;
