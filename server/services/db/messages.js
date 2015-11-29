var Classes = require('./../../classes');

var methods = {};

module.exports = function(knex) {

  methods.addMessage = function(message, from, to) {
    
    return knex.insert({message: message, sent_from: from, sent_to: to}, '*').into('messages')
    .then(function(data) {
      return data.map(function(row) {
        return new Classes.Message(row.message, row.created_at, row.sent_from, row.sent_to);
      });
    });

  };

  methods.getMessages = function(email) {

    //select the id of the row with the email
    return knex.select('id').from('users').where('email','=', email)
    .then(function(data) {
      var id = data[0].id;
      //use id to filter messages table
      return knex.select('*').from('messages').where('sent_from','=', id).orWhere('sent_to','=',id);
    })
    .then(function(data) {
      return data.map(function(row) {
        return new Classes.Message(row.message, row.created_at, row.sent_from, row.sent_to);
      });
    });

  };

  return methods;

};

