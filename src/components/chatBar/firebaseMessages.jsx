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
    console.log('change event triggered');
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
    var renderedMessages = this.state.messages.map(function(element, index, array){
      var name = element[0];
      var message = element[1];
      var diff = that.props.unread;
      console.log('this the the diff:',diff);
      if(diff > 0) {
       if(index > that.props.readMess) {
          return (
            <li key={index} className="redFont">{name+":"+" "+message}</li> 
          );
        } else {
          return (
            <li key={index} >{name+":"+" "+message}</li> 
          );
        }
      } else {
        return (
            <li key={index} >{name+":"+" "+message}</li> 
        );
      }
    }/*.bind(this)*/);

    return ( // render the messages in the ul 

      <ul ref="messageScroll" className="messagesRoll" style={{height: this.state.componentHeight}} >{renderedMessages}</ul> 

    );

  }

});

module.exports = firebaseMessages;
