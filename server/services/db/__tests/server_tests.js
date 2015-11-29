var assert = require('assert');
var Mocha = require('mocha');
var expect = require('chai').expect;

var kateId;
var rohanId;


var db = require('./../index'); //knex initiator

describe('database', function() {

/*  beforeEach(function() {
    //run before each
  });*/

  it('should be able to add a new user kate to the users table', function() {

    return db.users.create('fine_filly@hotmail.com','kate','corsetsRock', 'Kate', 'Rogers')
    .then(function(data) {
      expect(data.length).to.equal(1);
      expect(data[0].email).to.equal("fine_filly@hotmail.com");
      kateId = data[0].id;
    });
  
  });

  it('should be able to add a new user rohan the users table', function() {

    return db.users.create('sarith21@gmail.com','huggada1','imonlyfive', 'Rohan', 'Pethiyagoda')
    .then(function(data) {
      //testing the return object not the database
      expect(data.length).to.equal(1);
      expect(data[0].email).to.equal("sarith21@gmail.com");
      rohanId = data[0].id;
    });
  
  });

  it('should be able to add a message to the messages table', function() {

    return db.messages.addMessage('yo world', kateId, rohanId)
    .then(function(data) {
      expect(data[0].text).to.equal('yo world');
      expect(data[0].from).to.equal(kateId);
    });

  });

  it('should get messages from rohan', function() {

     return db.messages.getMessages('sarith21@gmail.com')
     .then(function(data) {
        expect(data[0].text).to.equal('yo world');
        expect(data[0].from).to.equal(1);
     });

  });

});