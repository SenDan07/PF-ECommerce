const { Router } = require('express');
const shopController = require('../controllers/shopController.js');

const router = Router();

router.get('/books', shopController.filterBooksByAuthor);
router.get('/books/order', shopController.orderBooksByAlphabetically);

module.exports=router;