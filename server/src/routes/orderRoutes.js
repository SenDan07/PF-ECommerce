const { Router } = require('express');
const orderControllers = require('../controllers/orderControllers');

const router = Router();

router.post("/create", orderControllers.createOrder);
router.get("/orders/:idUser", orderControllers.getOrders);

module.exports = router