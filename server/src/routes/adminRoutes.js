const { Router } = require("express");
const express = require("express");

const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

router.post("/create-book", adminControllers.createBook);

module.exports = router
