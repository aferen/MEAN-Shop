var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
var FeaturedSchema = new Schema({
    'productId' : Schema.Types.ObjectId,
    'imageName' : String
}, opts);

FeaturedSchema.virtual('imageFeaturedUrl').
  get(function() { 
    return process.env.BASE_URL + "image/featured/" +  this.imageName;
	 });

module.exports = mongoose.model('Featured', FeaturedSchema);