const { Router } = require('express');
const orderControllers = require('../controllers/orderControllers');

const router = Router();

router.post("/create", orderControllers.createOrder);

module.exports = router