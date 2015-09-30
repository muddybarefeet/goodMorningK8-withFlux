/*//where I will make a bar for the user to put their name so it can go in the good morning part

var React = require('react');
var actions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore.js');


var nameInput = React.createClass({
    
  getInitialState: function() { //set initial needs to be an object
    return {
      userInput: AppStore.getData().name
    };
  },


  handleChange: function(e) { //e is the event itself
    if(e.key === 'Enter'){
      //send an action and update the stores
      actions.nameEnter(this.state.userInput); //pass the state to the actions function nameChange when enter key hit.
    }else{
      var inputNode = this.refs.myInput.getDOMNode();//this gets you a reference to the element that has the ref myInput
      var value = inputNode.value;
      this.setState({userInput: value});
    }

  },
  
  render: function(){
    return (
        <div >
          <input ref="myInput" className="nameInputArea"
            onKeyUp={this.handleChange}></input> 
        </div>
    )
  }//onKeyPress not waiting for the key to have been release in this case meant that I was one letter behind!

});

module.exports = nameInput;*/