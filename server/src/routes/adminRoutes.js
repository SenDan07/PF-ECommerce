const { Router } = require('express');
const adminController = require('../controllers/adminController');

const router = Router();

router.post('/books', adminController.createBook);

module.exports = router;
