const { Router } = require("express");

const shopControllers = require("../controllers/shopControllers");
const cartRoutes = require("./cartRoutes");

const router = Router();

router.use("/cart", cartRoutes);

router.get("/books", shopControllers.fetchAllBooks);

router.get("/books", shopControllers.filterBooksByAuthor);

router.get("/books/orderprice", shopControllers.orderBooksPrice);

router.get("/books/order", shopControllers.orderBooksByAlphabetically);

router.get("/book/:idBook", shopControllers.getBookById);

router.get("/categories", shopControllers.fetchAllCategories);

module.exports = router;
