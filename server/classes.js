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

var Friend = function(fromId, toId) {
  this.fromId = fromId;
  this.toId = toId;
};

classes.User = User;
classes.Message = Message;
classes.Friend = Friend;

module.exports = classes;