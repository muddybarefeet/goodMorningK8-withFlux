var React = require('react');

var APP = require('./components/app.jsx');
var AppStore = require('./stores/AppStore.js');

AppStore.init();

module.exports = React.renderComponent(<APP />, document.body);