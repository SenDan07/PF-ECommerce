const { Router } = require('express');
const cartController = require('../controllers/cartController');

const router = Router();


router.post("/cartUser",cartController.postCartUser);

router.get("/cartUser",cartController.getCartUser);

router.put("/cartUser", cartController.deleteCartUser)

router.get("/:idCustomer", cartController.getCartByCustomer);
module.exports = router