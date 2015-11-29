//should use knex to link to database

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',//where database lives IP address
    user     : 'anna', //default
    database : 'gmk8',
    debug: true
  }
});


var methods = {};

methods.users = require('./users')(knex); //pass knex to file when evaluating it so knex it run in it too
methods.messages = require('./messages')(knex);
methods.friends = require('./friends')(knex);

module.exports = methods;









