var ProductSchema = require('./product').schema;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CartItemSchema = new Schema({
    'product': ProductSchema,
    'amount' : Number
});

module.exports = mongoose.model('CartItem', CartItemSchema);