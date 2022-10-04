const { Router } = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = Router();
const loginController = require('../controllers/loginController');
//const { validateFields } = require('../util/middleware/validateFields');

router.post('/register',[
    check('name','El nombre es requerido').not().isEmpty(),
    check('lastName','El apellido es requerido').not().isEmpty(),
    check('password','El password debe contener minimo de tres caracteres').isLength({min:3}),
   
    check('email','Formato de mail inválido').isEmail(),
    //validateFields
], loginController.registerUser)
router.post('/login',[
    check('password','Ingrese password').not().isEmpty(),
    
    check('email','Formato de mail inválido').isEmail(),
    //validateFields
], loginController.loginUser);

router.put('/:id',()=>{

})

module.exports = router;
