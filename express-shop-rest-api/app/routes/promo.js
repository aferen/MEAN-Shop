var express = require('express');
var router = express.Router();
var PromoController = require('../controllers/promo');

/*
 * GET
 */
router.get('/', PromoController.list);

/*
 * GET
 */
router.get('/:id', PromoController.show);

/*
 * POST
 */
router.post('/', PromoController.create);

/*
 * PUT
 */
router.put('/:id', PromoController.update);

/*
 * DELETE
 */
router.delete('/:id', PromoController.remove);

module.exports = router;
