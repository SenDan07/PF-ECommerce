const { Router } = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = Router();
const loginController = require('../controllers/loginController');
const { thereIsUserById } = require('../util/helpers/db-validators');
const { jwtValidator } = require('../util/middleware/jwt-validator');
// registrar usuario 
router.post('/register',[
    check('name','El nombre es requerido').not().isEmpty(),
    check('lastName','El apellido es requerido').not().isEmpty(),
    check('password','El password debe contener minimo de tres caracteres').isLength({min:3}),
    check('email','Formato de mail inválido').isEmail(),
], loginController.registerUser);
//logear usuario 
router.post('/login',[
    check('password','Ingrese password').not().isEmpty(),
    check('email','Formato de mail inválido').isEmail(),
], loginController.loginUser);
//modificar campos del usuario
router.put('/:id',[check('id').custom( thereIsUserById )],loginController.putUser);
//obtener todos los usuarios
router.get('/allUsers',loginController.getAllUsers);
//borrado logico del usuario 
router.delete('/:id',[check('id').custom( thereIsUserById )],loginController.deleteUser);
//google sign in 
router.post('/google',[check('id_token','Falta token').not().isEmpty(),
check('email','Formato de mail inválido').isEmail(),],loginController.googleSignIn);
//obtener libros favoritos
router.get('/favorites/:id', loginController.getFavorites);
//revalidar token 
router.get('/renew',jwtValidator,loginController.tokenRevalidate);
//restablecer contraseña

router.put('/resetPassword/:id',loginController.resetPassword)

module.exports = router;


//crud de usaurios editar 