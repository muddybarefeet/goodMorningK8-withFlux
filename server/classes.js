var classes = {};

var User = function(id, email, username, password){
  this.id = id;
  this.email = email;
  this.username = username;
  this.password = password;
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