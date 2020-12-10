var express = require('express');
var router = express.Router();
var ImageController = require('../controllers/image');


router.get('/product/:id', ImageController.productImageShow);

router.get('/featured/:id', ImageController.featuredImageShow);

router.get('/promo/:id', ImageController.promoImageShow);

router.post('/upload/product', ImageController.uploadProductImage);

module.exports = router;
