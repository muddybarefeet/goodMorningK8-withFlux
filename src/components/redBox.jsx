var React = require('react');

var redBox = React.createClass({
  render: function(){
      return ( 
        <div style={{backgroundColor:'red',width:"200px",height:"100px"}}></div>
       );
  }
});

module.exports = redBox;