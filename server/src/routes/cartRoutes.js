const { Router } = require('express');
const cartController = require('../controllers/cartController');

const router = Router();

router.get("/cartBookStock", cartController.getStockCart);

router.post("/cartUser",cartController.postCartUser);

router.get("/cartUser",cartController.getCartUser);

router.get("/:idCustomer", cartController.getCartByCustomer);

router.put("/cartUser",cartController.deleteCartUser);


module.exports = router