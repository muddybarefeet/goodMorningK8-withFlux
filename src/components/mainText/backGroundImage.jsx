
var React = require('react');

var backgroundImage = React.createClass({
  
  render: function(){
    //put button on the screen again with the new state
    return (
      
      <div>
        <div style={{
          backgroundImage:'url(https://davidwiltonblog.files.wordpress.com/2012/03/blog.jpg)',
          width:"100%",
          height:"100%",
          backgroundSize:'cover',
          position:'absolute',
          top:'0',
          left:'0',
          zIndex:'-1'
        }}></div>
      </div>
      
    );
  }
});

module.exports = backgroundImage;