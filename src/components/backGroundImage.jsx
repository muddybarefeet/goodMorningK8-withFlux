
var React = require('react');
var moment = require('moment');
var AppStore = require('../stores/AppStore.js');


var getAppState= function(){
  return AppStore.getData().backGImg;
};

var backgroundImage = React.createClass({

getInitialState: function(){//default state for comonent (from store)
  return {
    currentBackground : getAppState()
  };
},

_onChange: function(){
  //set the new state of the component when triggered by the event listener in the store
    this.setState({
      currentBackground : getAppState()
    });
    //set state will always trigger the render method
},

componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
},

  /*componentWillUnmount: function(){
    //removes event listener from the app store when the component removed from the page
    AppStore.removeChangeListener(this._onChange);
  },*/

  render: function(){
    var currentBackgroundNum = parseInt(this.state.currentBackground);
    return (
      <div>
        <div className="background"style={{
          backgroundImage:'url(http://localhost:3000/public/backgroundImages/'+currentBackgroundNum+'.jpg)'
        }}></div>
      </div>
    );
  }
});

module.exports = backgroundImage;