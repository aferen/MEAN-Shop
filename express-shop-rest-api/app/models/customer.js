var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerShema = new Schema({
    'firstname' : String,
    'lastname' : String,
    'adress1' : String,
    'adress2' : String,
    'zip' : Number,
    'city' : String,
    'email' : String,
    'phone' : String,
    'company' : String,
    'country' : String
});

module.exports = mongoose.model('Customer', CustomerShema);
