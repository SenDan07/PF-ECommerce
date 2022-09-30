const { Router } = require('express');
const cartController = require('../controllers/cartController');

const router = Router();

router.get("/:idCustomer", cartController.getCartByCustomer);

module.exports = router