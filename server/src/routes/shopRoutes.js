const { Router } = require('express');
const shopControllers = require('../controllers/shopControllers');

const router = Router();

router.get('/books', shopControllers.filterBooksByAuthor);
router.get('/books/order', shopControllers.orderBooksByAlphabetically);
router.get('/book/:idBook', shopControllers.getBookById);

module.exports=router;