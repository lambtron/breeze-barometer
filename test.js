#!/usr/bin/env node

var pg = require("pg");
var fs = require("fs");
var readline = require("readline");
var stream = require("stream");

var conString = "pg://andyjiang:password@localhost:5432/template1";
var filepath = process.argv[2];
var instream = fs.createReadStream(filepath);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var client = new pg.Client(conString);
client.connect();

// client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

// var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
// query.on("row", function (row, result) {
//     result.addRow(row);
// });
// query.on("end", function (result) {
//     console.log(JSON.stringify(result.rows, null, "    "));
//     client.end();
// });

// create table and import some stuffs

 // "updated_at"=>"2014-09-17 15:18:28 -0700",
 // "current_stage"=>"new_application_stage",
 // "neighborhood"=>nil,
 // "full_name"=>"Henry Kim",
 // "email"=>"henry@movemotors.com"

client.query("CREATE TABLE IF NOT EXISTS users(full_name varchar(64), email varchar(64), neighborhood varchar(64), current_stage varchar(64), updated_at timestamp with time zone)");

rl.on('line', function(line) {
  var obj = JSON.parse(line);
  var load = {
    full_name: obj.full_name,
    email: obj.email,
    neighborhood: obj.neighborhood,
    current_stage: obj.current_stage,
    updated_at: obj.updated_at
  };
  // console.log(load);
  client.query("INSERT INTO users(full_name, email, neighborhood, current_stage, updated_at) values ($1, $2, $3, $4, $5)",
    [load.full_name, load.email, load.neighborhood, load.current_stage, load.updated_at]);
});

rl.on('close', function() {
  client.end();
  console.log("That's a wrap!");
});