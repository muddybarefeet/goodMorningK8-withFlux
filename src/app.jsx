var React = require('react');

var APP = require('./components/app.jsx');
var AppStore = require('./stores/AppStore.js');
var actions = require('./actions/AppActions.js');

AppStore.init();
actions.init();


module.exports = React.renderComponent(<APP />, document.body);