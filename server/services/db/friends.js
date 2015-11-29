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

  methods.getNewReqests = function (userEmail) {

    return knex.select('id').from('users').where('email', userEmail)
    .then(function (id) {
      console.log("USER ID IN GET REQ",id);
      return knex.select('*').from('friends').where('request_received', id[0].id);
    })
    .then(function (returnedRows) {
      console.log('RETURNED ROWS', returnedRows);
      //get a list of all the people who have asked to be your friend
     //JOIN TABLE!!!
     return knex.from('users')
     .innerJoin('friends', 'users.id', 'friends.request_sent')
     .select('users.id', 'users.first_name', 'users.last_name', 'friends.request_sent');
    })
    .then(function (joinRows) {
      console.log('JOIN ROWS!!!-------->', joinRows);
      //loop through the array
      return joinRows.map(function (row) {
        return new Classes.FriendsGot(row.id, row.first_name, row.last_name);
      });
    })
    .catch(function(err) {
      console.log('ERROR!!',err);
    });

  };

  return methods;

};
