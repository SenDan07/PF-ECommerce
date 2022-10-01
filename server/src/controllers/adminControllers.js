const HttpError = require("../errors/http-error");
const libros = require("../../data/dataBook.json");
const { Categories, Books } = require("../db");

const adminControllers = {
  createBook: async (req, res, next) => {
    const {
      title,
      authors,
      publisher,
      ISBN,
      imageLinks,
      description,
      price,
      categories } = req.body
    try {
      const books = await Books.findOne({where: {title}});
      if (books) throw new HttpError("El libro ya existe", 400);
      else {
        const createBook = await Books.create({
          title,
          authors,
          publisher,
          ISBN,
          imageLinks,
          description,
          price,
        });
        const typeofBooks = await Categories.findAll({ where: { name:categories } });
        //console.log(typeofBooks.JSON())
        createBook.addCategories(typeofBooks);       
        return res.send("El libro fue creado");   
      }
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("No se pudo crear el libro, intente nuevamente más tarde", 500);
      }
      return next(error);
    }
  },
};

module.exports = adminControllers;
