const { Router } = require('express');
const shopControllers = require('../controllers/shopControllers.js');

const router = Router();

router.get('/books', shopControllers.filterBooksByAuthors);

module.exports=router;