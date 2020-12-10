var mongoose = require('mongoose');
var Shema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var PromoShema = new Shema({
    'preHeading' : String,
    'heading' : String,
    'afterHeading' : String,
    'imageName' : String,
    'buttonText' : String,
    'link' : String    
}, opts);

PromoShema.virtual('imageUrl').
  get(function() { 
    return process.env.BASE_URL + "image/promo/" +  this.imageName;
    });


module.exports = mongoose.model('Promo',PromoShema);