
var React = require('react');
//var css = require('../../../assets/styles.css');

var nameButton = React.createClass({
  
  getInitialState: function(){//default state for comonent (from store)
    return {
      text : "Set Your Name"
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
/*
  handleClick: function(args){

    if(args === 'buttonLeft') {
      AppActions.leftSide(); //trigger action
    } else if(args === 'buttonMiddle') {
      AppActions.middle();
    } else if(args === 'buttonRight') {
      AppActions.rightSide();
    }

  },*/
  
  render: function(){
    return (

        <i className="fa fa-cogs fa-2x" style={{
          color:"white",
          position:"absolute",
          bottom:"20px",
          left:"0",
          backgroundColor:"rgba(0,0,0,0.7)",
          padding: "10px",
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px'
        }}></i>
        /*<button style={{
          position:'absolute',
          bottom:'10px'
        }}></button>*/
      
      );
  }
});

module.exports = nameButton;