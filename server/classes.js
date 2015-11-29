var classes = {};

var User = function(id, email, username, password, firstName, lastName){
  this.id = id;
  this.email = email;
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
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

var FriendsGot = function(id, firstName, lastName) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
};

classes.User = User;
classes.Message = Message;
classes.Friend = Friend;
classes.FriendsGot = FriendsGot;

module.exports = classes;