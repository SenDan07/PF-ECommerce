const { Router } = require("express");
const alertControllers = require("../controllers/alertControllers");

const router = Router();

router.post("/alert/email", alertControllers.sendEmail);

module.exports = router;