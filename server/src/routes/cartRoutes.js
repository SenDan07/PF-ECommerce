const { Router } = require('express');
const cartController = require('../controllers/cartController');

const router = Router();

router.get("/cart", cartController);

module.exports = router