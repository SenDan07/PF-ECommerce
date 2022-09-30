const { Router } = require('express');

const router = Router();
const loginController = require('../controllers/loginController');

router.post('/register', loginController.registerUser)
router.post('/login', loginController.loginUser)

module.exports = router;
