var classes = {};

var User = function(id, email, username){
  this.id = id;
  this.email = email;
  this.username = username;
};

var Message = function(text, time, from, to) {
  this.text = text;
  this.from = from;
  this.to = to;
  this.time = time;
};

classes.User = User;
classes.Message = Message;

module.exports = classes;