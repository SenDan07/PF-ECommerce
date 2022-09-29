const { Router } = require('express');
const cartController = require('../controllers/cartController');

const router = Router();

router.get("/cart/:idCustomer", cartController);

module.exports = router