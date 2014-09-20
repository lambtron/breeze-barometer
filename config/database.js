'use strict';

(function() {
  // Server.js is going to retrieve database.url.
  var TREASURE_DATA_API_KEY = process.env.TREASURE_DATA_API_KEY;
  module.exports = {
    // The database url to connect.
    url: TREASURE_DATA_API_KEY
  }
}());