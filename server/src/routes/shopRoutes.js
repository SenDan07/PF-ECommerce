const { Router } = require('express');
const shopController = require('../controllers/shopController.js');

const router = Router();

router.get('/books', shopController.filterBooksByAuthor);
router.get('/books/order', shopController.orderBooksByAlphabetically);
router.get('/book/:idBook', shopController.getBookById);

module.exports=router;