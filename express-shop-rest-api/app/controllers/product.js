var ProductModel = require('../models/product');


module.exports = {

    list: function (req, res) {
        ProductModel.find(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },
     
    listByQuery: function (req, res) {
        var sort = req.params.sort.toString();
        var equal = req.params.equal;
        var limit = parseInt(req.params.limit);

        var findObj = {};
        findObj[sort] = equal;

        ProductModel.find(findObj).sort(sort).limit(limit).exec(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },

    listByDate: function (req, res) {
        var limit = parseInt(req.params.limit);

        ProductModel.find({}).sort({"date" : -1}).limit(limit).exec(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },

    
    listByRating: function (req, res) {
        var limit = parseInt(req.params.limit);

        ProductModel.find({}).sort({"currentRating" : -1}).limit(limit).exec(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },


    find: function (req, res) {
        var term = req.params.term.toString();

        ProductModel.find({ "name" : { $regex: new RegExp("^" + term.toLowerCase(), "i") } }).exec(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json(Products);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }
            return res.json(Product);
        });
    },

    create: function (req, res) {
        var Product = new ProductModel({
			date : req.body.date,
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,	
            priceNormal : req.body.priceNormal,
            reduction : req.body.reduction,	
            imageNames : req.body.imageNames,
            categories : req.body.categories,
            ratings : req.body.ratings,
            currentRating : req.body.currentRating,
			sale : req.body.sale
        });

        Product.save(function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }
            return res.status(201).json(Product);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

			Product.date = req.body.date ? req.body.date : Product.date;
            Product.name = req.body.name ? req.body.name : Product.name;
			Product.description = req.body.description ? req.body.description : Product.description;
            Product.price = req.body.price ? req.body.price : Product.price;
			Product.priceNormal = req.body.priceNormal ? req.body.priceNormal : Product.priceNormal;
            Product.reduction = req.body.reduction ? req.body.reduction : Product.reduction;
			Product.imageNames = req.body.imageNames ? req.body.imageNames : Product.imageNames;
			Product.categories = req.body.categories ? req.body.categories : Product.categories;
            Product.ratings = req.body.ratings ? req.body.ratings : Product.ratings;
			Product.currentRating = req.body.currentRating ? req.body.currentRating : Product.currentRating;
            Product.sale = req.body.sale ? req.body.sale : Product.sale;
            Product.save(function (err, Product) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        ProductModel.findByIdAndRemove(id, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
