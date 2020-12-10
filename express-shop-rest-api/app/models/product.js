var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
var ProductSchema = new Schema({
	'id' : { type : Number },
	'date' : { type :  Date},
	'name' : String,
	'description' : String,
	'price' : Number,
	'priceNormal' : Number,
	'reduction' : Number,
	'imageNames': [ { type : String } ],
	'categories' : Schema.Types.Mixed,
	'ratings' : Schema.Types.Mixed,
	'currentRating' : { type : Number },
	'sale': { type : Boolean }
}, opts);
	
ProductSchema.virtual('imageURLs').
  get(function() { 
	  var arr = [];
	  for (let i = 0; i < this.imageNames.length; i++) {
		var str =  process.env.BASE_URL + "image/product/" +  this.imageNames[i];
		  arr.push(str)
	  }
	  return arr;  
	 });

module.exports = mongoose.model('Product', ProductSchema);
