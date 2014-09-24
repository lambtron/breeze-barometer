'use strict';

(function() {
  // Server.js is going to retrieve database.url.
  module.exports = {
    // The database url to connect.
    url: process.env.DATABASE_URL
  }
}());