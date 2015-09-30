var React = require('react');
var AppStore = require('../../stores/AppStore.js');

var Name = React.createClass({
  
  getInitialState: function(){//default state for comonent (from store)
    return {
      currentInput : AppStore.getData().name
    };
  },

  _onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState({
      currentInput : AppStore.getData().name
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
  
  render: function(){
    //put button on the screen again with the new state
    return (
      <div className="mainText greeting name">{this.state.currentInput+"!"}</div>
    );
  },
});

module.exports = Name;