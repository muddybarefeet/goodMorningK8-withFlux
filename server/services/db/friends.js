var Classes = require('./../../classes');

var methods = {};

module.exports = function(knex) {

  methods.createRequest = function (emailFrom, emailTo) {
    
    return knex.select('*').from('users').where('email', emailFrom).orWhere('email','=', emailTo)
    .then(function (users) {
      var data = [];
      users.forEach(function (user) {
        if (user.email === emailFrom) {
          data[0] = user.id;
        } else {
          data[1] = user.id;
        }
      });
      return data;
    })
    .then(function (userIds) {
      //take the array and insert into table
      return knex.insert({ request_sent: userIds[0], request_received: userIds[1] }, '*').into('friends');
    })
    .then(function (rowInserted) {
      return new Classes.Friend(rowInserted[0].request_sent, rowInserted[0].request_received);
    })
    .catch(function (err) {
      console.log("ERROR in adding a friend request", err);
    });

  };

  // methods.acceptRequest = function (emailFrom, emailTo) {

  //   return knex.select('*').from('users').where('email', emailFrom).orWhere('email','=', emailTo)
  //   .then(function (users) {

  //   })

  // };

  methods.getNewReqests = function (userEmail) {

    return knex.select('id').from('users').where('email', userEmail)
    .then(function (id) {
      console.log("USER ID IN GET REQ",id);
      return knex.select('*').from('friends').where('request_received', id);
    })
    .then(function (returnedRows) {
      console.log('RETURNED ROWS', returnedRows);
      //loop through the rows and format
      //send to server
    })
    .catch(function(err) {
      console.log('ERROR!!',err);
    });

  };

  return methods;

};
