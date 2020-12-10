var FeaturedModel = require('../models/featured');

/**
 * FeaturedController.js
 *
 * @description :: Server-side logic for managing Featureds.
 */
module.exports = {

    /**
     * FeaturedController.list()
     */
    list: function (req, res) {
        FeaturedModel.find(function (err, Featureds) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Featured.',
                    error: err
                });
            }
            return res.json(Featureds);
        });
    },

    /**
     * FeaturedController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        FeaturedModel.findOne({_id: id}, function (err, Featured) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Featured.',
                    error: err
                });
            }
            if (!Featured) {
                return res.status(404).json({
                    message: 'No such Featured'
                });
            }
            return res.json(Featured);
        });
    },

    /**
     * FeaturedController.create()
     */
    create: function (req, res) {
        var Featured = new FeaturedModel({
			featureds : req.body.featureds			
        });

        Featured.save(function (err, Featured) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Featured',
                    error: err
                });
            }
            return res.status(201).json(Featured);
        });
    },

    /**
     * FeaturedController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        FeaturedModel.findOne({_id: id}, function (err, Featured) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Featured',
                    error: err
                });
            }
            if (!Featured) {
                return res.status(404).json({
                    message: 'No such Featured'
                });
            }

            Featured.featureds = req.body.featureds ? req.body.featureds : Featured.featureds;
					
            Featured.save(function (err, Featured) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Featured.',
                        error: err
                    });
                }

                return res.json(Featured);
            });
        });
    },

    /**
     * FeaturedController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        FeaturedModel.findByIdAndRemove(id, function (err, Featured) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Featured.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
