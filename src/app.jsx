var React = require('react');

var APP = require('./components/app.jsx');
var AppStore = require('./stores/AppStore.js');
var actions = require('./actions/AppActions.js');
var serverActions = require('./actions/serverActions.js');

AppStore.init();
serverActions.init();

module.exports = React.renderComponent(<APP />, document.body);