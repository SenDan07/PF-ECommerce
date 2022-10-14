const { Router } = require("express");

const adminControllers = require("../controllers/adminControllers");

const router = Router();


/*------------------- RUTAS PRODUCTO (CRUD) ---------------------- */

router.post("/create-book", adminControllers.createBook);

router.put('/books/:idBook',adminControllers.updateBook),

router.delete('/books/:idBook',adminControllers.deleteBook);

/*------------------- RUTAS CATEGORIA (CRUD) ---------------------- */

router.post("/create-category", adminControllers.createCategory);

router.put('/category/:idCategory',adminControllers.updateCategory);

router.delete('/category/:idCategory',adminControllers.deleteCategory);

/**----------------RUTAS DE USUARIOS-------------------------------- */

router.get("/userByEmail", adminControllers.getUserByEmail);

router.get("/allUsers",adminControllers.getAllUsers);

router.get("/userById/:idUser",adminControllers.getUserById);
/**----------------RUTAS DE ORDENES-------------------------------- */

router.get("/orderByUser", adminControllers.geOrderByUser);

router.get("/allOrders",adminControllers.getAllOrders);


module.exports = router;
