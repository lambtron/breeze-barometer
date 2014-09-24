// Connect to database.
var pg = require('pg');
var database = require('../../config/database');

var client = new pg.Client(database.url);
// client.connect( function callback() {
//   console.log('Postgres is running');
// });

module.exports = {
  query: function(text, values, cb) {
    client.connect(function(err, client, done) {
      client.query(text, values, function(err, result) {
        cb(err, result);
      });
    });
  }
};