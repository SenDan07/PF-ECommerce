const HttpError = require("../models/http-error");
const libros = require("../../data/dataBook.json");
const dataCategory=require("../../data/categories.json");

const shopControllers = {
  fetchAllBooks: (req, res, next) => {
    try {
      const itemList = libros.items.map((e) => {
        return {
          id: e.id,
          title: e.title,
          authors: e.authors.join(", "),
          publisher: e.publisher,
          ISBN: e.ISBN,
          categories: e.categories,
          imageLinks : e.imageLinks,
          description: e.description,
          price: e.price,
        };
      });
      const allBooks = [...itemList];
      res.status(200).send(allBooks);
    } catch (err) {
      const error = new HttpError(
        `No hay libros en el inventario ${console.log(err)}`,
        404
      );
      return next(error);
    }
  },
  filterBooksByAuthor: (req, res) => {
    try {
      const { author } = req.query;
      if (!author) throw "Debe enviar un author";
      const authorsFound = libros.items.filter(el => el.authors.map(el=> el.toUpperCase()).includes(author.toUpperCase()));
      if (authorsFound.length < 1) throw "El author no existe";
      return res.status(200).json(authorsFound);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  orderBooksByAlphabetically: (req, res) => {
    const { type } = req.query;
    try {
      if (!type) throw "Debe enviar una opción";
      const orderByName =
        type === "asc"
          ? libros.items?.sort((prev, current) =>
              prev.title.localeCompare(current.title)
            )
          : libros.items?.sort((prev, current) =>
              current.title.localeCompare(prev.title)
            );
      if (!orderByName.length) throw "No existen libros";
      return res.send(orderByName);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  getBookById: (req, res) => {
    const { idBook } = req.params;
    try {
      if (!idBook) throw "Debe enviar el id";
      const book = libros.items?.find(({ id }) => id === Number(idBook));
      if (!book) throw "El libro no existe";
      res.send(book);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  orderBooksPrice: (req, res) => {
    try {
      const { type } = req.query;
      if(!type) throw "Debe enviar la tipo de ordenamiento";
      if (type === "asc") libros.items.sort((a, b) => a.price - b.price);
      else if (type === "desc") libros.items.sort((a, b) => b.price - a.price);
      return res.status(200).json(libros);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  fetchAllCategories: (req, res) => {
    try {
      if(dataCategory.categories.length < 1) throw "No hay categorias para mostrar";
      return res.status(200).json(dataCategory.categories)
    } catch (error) {
      return res.status(400).send(error)
    }
    
  }
};

module.exports = shopControllers;
