var CustomerShema = require('./customer').schema;
var CartItemShema = require('./cartItem').schema;
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    'customer' : CustomerShema,
    'items' : [CartItemShema],
    'total' : Number,
    'status' : String,
    'number' : String,
    'date' : Date,
    'shippingMethod' : String,
    'paymentMethod' : String    
})


module.exports = mongoose.model('Order', OrderSchema);
 