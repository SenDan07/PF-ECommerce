const HttpError = require("../errors/http-error");
const libros = require("../../data/dataBook.json");
const dataCategory = require("../../data/categories.json");

const { Categories, Books } = require("../db");

const allBooks = async () => {
  const books = await Books.findAll({
    include: {
      model: Categories,
      attributes: ["name", "imageLinks"],
      through: {
        attributes: []
      }
    }
  });
  return books;
}

const shopControllers = {

  fetchAllBooks: async (req, res, next) => {
    try {
      const books = await allBooks();
      return res.status(200).json(books);
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
      const authorsFound = libros.items.filter(el => el.authors.map(el => el.toUpperCase()).includes(author.toUpperCase()));
      if (authorsFound.length < 1) throw "El author no existe";
      return res.status(200).json(authorsFound);
    } catch (err) {
      const error = new HttpError(
        `No hay libros en el inventario ${console.log(err)}`,
        404
      );
      return next(error);
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
    } catch (err) {
      const error = new HttpError(
        `No hay libros en el inventario ${console.log(err)}`,
        404
      );
      return next(error);
    }
  },
  getBookById: async(req, res) => {
    const { idBook } = req.params;
    try {
      if (!idBook) throw "Debe enviar el id";
      const book = await Books.findOne({
        where: {
          id: idBook
        },
        include: {
          model: Categories,
          attributes: ["name", "imageLinks"],
          through: {
            attributes: []
          }
        }
      });
      if (!book) throw "El libro no existe";
      res.status(200).json(book);
    } catch (err) {
      const error = new HttpError(
        `No hay libros en el inventario ${console.log(err)}`,
        404
      );
      return next(error);
    }
  },
  orderBooksPrice: async (req, res) => {
    try {
      const { type } = req.query;
      if (!type) throw "Debe enviar la tipo de ordenamiento";
      const books = await allBooks();
      if (type === "asc") books.sort((a, b) => a.price - b.price);
      else if (type === "desc") books.sort((a, b) => b.price - a.price);
      return res.status(200).json(books);
    } catch (err) {
      const error = new HttpError(
        `No hay libros en el inventario ${console.log(err)}`,
        404
      );
      return next(error);
    }
  },
  fetchAllCategories: async (req, res) => {
    try {
      const categories = await Categories.findAll();
      if (!categories.length) {
        categories = await Categories.bulkCreate([
          {
            "name": "Aventuras",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558360/Categorias/zfkojcumgapvdlhsxzln.jpg"
          },
          {
            "name": "Ciencia Ficcion",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558562/Categorias/jozik2dkbyz6mcrbvjqj.jpg"
          },
          {
            "name": "Comedia",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558610/Categorias/qhapmtkb6gqocbrafgjc.jpg"
          },
          {
            "name": "Drama",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558655/Categorias/erd2d2fgikyh6av8rrju.jpg"
          },
          {
            "name": "Educativo",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558712/Categorias/fh4jj8sk5jy6cw4kwexi.jpg"
          },
          {
            "name": "Fantasia",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558756/Categorias/sswupfd4auvnbsmo6wvg.jpg"
          },
          {
            "name": "Historia",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558834/Categorias/qazmlonrfugra08r8x0l.jpg"
          },
          {
            "name": "Ilustraciones",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558898/Categorias/tuqcicd3siel6linv0fy.jpg"
          },
          {
            "name": "Romance",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664558956/Categorias/sc8alysehtogdpq80gs1.jpg"
          },
          {
            "name": "Suspenso",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664559033/Categorias/yozpn4h7rmndjim65tvs.jpg"
          },
          {
            "name": "Terror",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664559090/Categorias/jstnopducsskxigyzi4k.jpg"
          },
          {
            "name": "Sin Categoria",
            "imageLinks": "https://res.cloudinary.com/dl7pi3qek/image/upload/v1664559172/Categorias/i96kbhvacgunjbr9gfsg.jpg"
          }
        ])
        res.json(categories);
      }
      else res.json(categories);
    } catch (e) {
      res.redirect('/error');
    }
  }
};

module.exports = shopControllers;
