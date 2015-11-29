var Classes = require('./../../classes');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var methods = {};

module.exports = function(knex){

  methods.create = function(email, username, password, firstName, lastName){
    
    return bcrypt.genSaltAsync(10)
    .then(function(salt) {
      return bcrypt.hashAsync(password, salt);
    })
    .then(function(hash) {
      console.log('IN USERS',hash);
      return knex.insert({email: email, user_name: username, password: hash, first_name: firstName, last_name: lastName}, '*').into('users');
    })
    .then(function(data) {
      return data.map(function(row) {
        return new Classes.User(row.id,row.email,row.user_name, row.password, row.first_name, row.last_name);
      });
    })
    .catch(function (err) {
      console.log(err);
    });

    //take a packet of data from the client and insert it into the database
  };

  methods.getAll = function() {
    //pass no arguments and get all of the users details and format
    return knex.select('*').from('users')
    .then(function(data) {
      //take the return data and pass it to the classes function to package the object and return the data you need
      return data.map(function(row) {
        return new Classes.User(row.id,row.email,row.user_name);
      });
    });

  };

  methods.checkPassword = function (email, password) {
    //find the user and check the passsword
    return knex('users').where('email', email)
    .then(function (data) {
      console.log('USER DATA!',data);
      return bcrypt.compareAsync(password, data[0].password);
    })
    .then(function (res) {
      console.log('RES!!!',res);
      return {returnVal: res};
    });

  };


  return methods;

};

