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
      const books = await Books.findAll({
        where: {
          title,

        }
      })


      if (books.length > 0) {
        res.status(200).json('El libro existe')
      } else {

        let createBook = await Books.create({
          title,
          authors,
          publisher,
          ISBN,
          imageLinks,
          description,
          price,
        });
        let typeofBooks = await Categories.findAll({ where: { name:categories } });
        //console.log(typeofBooks.JSON())
        createBook.addCategories(typeofBooks);
        
        return res.send("El libro fue creado");
        
      }

    

     
    } catch (err) {
      const error = new HttpError(
        `No se pudo crear el libro, intente nuevamente más tarde git ${console.log(
          err
        )}`,
        500
      );
      return next(error);
    }
    res.send('soy un libro')
  },
};

module.exports = adminControllers;
