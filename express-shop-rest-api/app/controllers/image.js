var ProductModel = require('../models/product');
var FeaturedModel = require('../models/featured');
var path = require('path');


module.exports = {

      uploadProductImage: function (req, res,next) {
        try {
          if(!req.files) {
              res.send({
                  status: false,
                  message: 'No file uploaded'
              });
          } else {
              //Use the name of the input field (i.e. "file") to retrieve the uploaded file
              let file = req.files.file;
              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              file.mv('./public/images/product/' + file.name);
              //send response
              res.send({
                  status: true,
                  message: 'File is uploaded',
                  data: {
                      name: file.name,
                      mimetype: file.mimetype,
                      size: file.size
                  }
              });
          }
      } catch (err) {
          res.status(500).send(err);
      }
    },

    productImageShow: function (req, res) {
        var options = {
            root: path.join(process.cwd(), '/public/images/product'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        
        var name = req.params.id;
        
        return res.sendFile(name, options, function (err) {
            if (err) {
              console.log(err);
            }
        });
    },


    featuredImageShow: function (req, res) {
        var options = {
            root: path.join(process.cwd(), '/public/images/featured'),//__dirname
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        
        var name = req.params.id;
        
        return res.sendFile(name, options, function (err) {
            if (err) {
              console.log(err);
            }
        });               
    },

    promoImageShow: function (req, res) {
      var options = {
          root: path.join(process.cwd(), '/public/images/promo'),
          dotfiles: 'deny',
          headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
          }
        }
      
      var name = req.params.id;
      
      return res.sendFile(name, options, function (err) {
          if (err) {
            console.log(err);
          }
      });               
  }
}