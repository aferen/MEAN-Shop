var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/auth')
var ProductController = require('../controllers/product');
require('../../config/passport')
const passport = require('passport')
const requireAuth = require('../../config/requireAuth');

router.get('/', ProductController.list);

router.get('/query/:sort/:equal/:limit', ProductController.listByQuery);

router.get('/date/:limit', ProductController.listByDate);

router.get('/rating/:limit', ProductController.listByRating);

router.get('/find/:term', ProductController.find);

router.get('/:id', ProductController.show);

router.post('/', ProductController.create);

router.put('/:id', ProductController.update);

router.delete('/:id', ProductController.remove);

module.exports = router;
