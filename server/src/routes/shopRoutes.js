const { Router } = require('express');
const shopController = require('../controllers/shopController.js');
const cartRoutes = require('./cartRoutes');

const router = Router();

router.use('/cart', cartRoutes);

router.get('/books', shopController.filterBooksByAuthor);
router.get('/books/order', shopController.orderBooksByAlphabetically);
router.get('/book/:idBook', shopController.getBookById);
router.get('/books/orderprice',shopController.orderBooksPrice);

module.exports=router;