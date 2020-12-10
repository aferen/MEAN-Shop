var express = require('express');
var router = express.Router();
var FeaturedController = require('../controllers/featured');

/*
 * GET
 */
router.get('/', FeaturedController.list);

/*
 * GET
 */
router.get('/:id', FeaturedController.show);

/*
 * POST
 */
router.post('/', FeaturedController.create);

/*
 * PUT
 */
router.put('/:id', FeaturedController.update);

/*
 * DELETE
 */
router.delete('/:id', FeaturedController.remove);

module.exports = router;
