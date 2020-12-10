var PromoModel = require('../models/promo');

/**
 * PromoController.js
 *
 * @description :: Server-side logic for managing Promos.
 */
module.exports = {

    /**
     * PromoController.list()
     */
    list: function (req, res) {
        PromoModel.find(function (err, Promos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Promo.',
                    error: err
                });
            }
            return res.json(Promos);
        });
    },

    /**
     * PromoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PromoModel.findOne({_id: id}, function (err, Promo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Promo.',
                    error: err
                });
            }
            if (!Promo) {
                return res.status(404).json({
                    message: 'No such Promo'
                });
            }
            return res.json(Promo);
        });
    },

    /**
     * PromoController.create()
     */
    create: function (req, res) {
        var Promo = new PromoModel({
			preHeading : req.body.preHeading,
			heading : req.body.heading,
            afterHeading : req.body.afterHeading,
            imageName : req.body.imageName,		
            buttonText : req.body.buttonText,
			link : req.body.link
        });

        Promo.save(function (err, Promo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Promo',
                    error: err
                });
            }
            return res.status(201).json(Promo);
        });
    },

    /**
     * PromoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PromoModel.findOne({_id: id}, function (err, Promo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Promo',
                    error: err
                });
            }
            if (!Promo) {
                return res.status(404).json({
                    message: 'No such Promo'
                });
            }

            Promo.preHeading = req.body.preHeading ? req.body.preHeading : Promo.preHeading;
			Promo.heading = req.body.heading ? req.body.heading : Promo.heading;
            Promo.afterHeading = req.body.afterHeading ? req.body.afterHeading : Promo.afterHeading;
			Promo.imageName = req.body.imageName ? req.body.imageName : Promo.imageName;
            Promo.buttonText = req.body.buttonText ? req.body.buttonText : Promo.buttonText;
			Promo.link = req.body.link ? req.body.link : Promo.link;
		
            Promo.save(function (err, Promo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Promo.',
                        error: err
                    });
                }

                return res.json(Promo);
            });
        });
    },

    /**
     * PromoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PromoModel.findByIdAndRemove(id, function (err, Promo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Promo.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
