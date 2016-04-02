//process.env.MONGOLAB_URI = mongodb://heroku_m931sf2p:aa16gi6d4g5i538jdp1sk9jm1c@ds061335.mongolab.com:61335/heroku_m931sf2p
//MONGOLAB_URI: mongodb://heroku_z44lzvq4:8non8vrdc42igc7l8aoob8mhfm@ds061415.mongolab.com:61415/heroku_z44lzvq4

var mongoose = require('mongoose');
var uri = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://127.0.0.1/shortlydb';
mongoose.connect(uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error."));
db.once('open', function(){
  console.log('connected!');
});

module.exports = db;
