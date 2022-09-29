const { Router } = require("express");

const adminControllers = require("../controllers/adminControllers");

const router = Router();

router.post("/create-book", adminControllers.createBook);

module.exports = router;
