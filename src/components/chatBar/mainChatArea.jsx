var React = require('react');


var typeMessageArea = require('./typeMessageArea.jsx');
var firebaseMessages = require('./firebaseMessages.jsx');
var AppStore = require('../../stores/AppStore.js');
var AppActions = require('../../actions/AppActions.js');


var chatArea = React.createClass({

  getInitialState: function() { //set initial state to false
      return {
          isSelected: false
      };
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState({
      readMessages : localStorage.getItem('readMessages'),
    });
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

  clickOnSetStore: function() {
      this.setState({
          isSelected: true
      });
  },

  clickOn: function() {
    this.setState({
          isSelected: true
    });
  },

  offClick: function() {
     this.setState({
          isSelected: false
      });
      AppActions.localStorageSet(AppStore.getData().counter);//takes the counter and sets local storage to this when the state is false
  },

  onClose: function() {
    AppActions.localStorageSet(AppStore.getData().counter);//takes the counter and sets local storage to this when the state is false
  },
  
  render: function(){
    var counter = AppStore.getData().counter;
    var read =  this.state.readMessages;
    var sum = counter-read;

    if(this.state.isSelected === true) {
      //trigger to set the Storage??
      
      console.log('counter open:',counter);
      console.log('read open:',read);

      return (
        
        <div className="chatBar">
          <div onClick={this.offClick}>
            <i className="fa fa-comment-o fa-2x"></i>
          </div>
          <h2 ref="chatHead" className="yammerer header">Yammerer</h2>
          <firebaseMessages unread={sum} readMess={read}></firebaseMessages>
          <typeMessageArea></typeMessageArea>
        </div>
      
      
      );
    
    } else if(this.state.isSelected === false && read < counter){ 
      return (
        <div>
          <i className="fa fa-comment-o fa-2x red" onClick={this.clickOn}></i>
        </div> 
      );

    } else if (this.state.isSelected === false){

      console.log('last render working');
      console.log('counter:',counter);
      console.log('read:',read);

      return (
        <div>
          <i className="fa fa-comment-o fa-2x" onClick={this.clickOn}></i>
        </div> 
      );

    } 
  }


});

module.exports = chatArea;