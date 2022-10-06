const { Router } = require("express");

const adminControllers = require("../controllers/adminControllers");

const router = Router();


/*------------------- RUTAS PRODUCTO (CRUD) ---------------------- */

router.post("/create-book", adminControllers.createBook);

router.put('/books/:idBook',adminControllers.updateBook)

router.delete('/books/:idBook',adminControllers.deleteBook)


module.exports = router;
