
//process.env.MONGOLAB_URI = mongodb://heroku_m931sf2p:aa16gi6d4g5i538jdp1sk9jm1c@ds061335.mongolab.com:61335/heroku_m931sf2p
//MONGOLAB_URI: mongodb://heroku_z44lzvq4:8non8vrdc42igc7l8aoob8mhfm@ds061415.mongolab.com:61415/heroku_z44lzvq4

//if uri = mongolab server heroku link
  //access server DB
//else
  //access local

var mongoose = require('mongoose');

//connection is process.env uri  OR local url string

var localUri = 'mongodb://127.0.0.1/test';
var uri = process.env.MONGOLAB_URI || localUri;

mongoose.connect(uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error."));
db.once('open', function(){
  console.log('connected!');
});

// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
