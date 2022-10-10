const uuid = require("uuid");
const HttpError = require("../errors/http-error");
const libros = require("../../data/dataBook.json");
const dataCategory = require("../../data/categories.json");

const { Categories, Books, Op } = require("../db");



const lengthBooks = async () => await Books.count();

const include = {
  model: Categories,
  as: "categories",
  attributes: ["name", "imageLinks"],
  through: {
    attributes: []
  }
};

const bookscargados = async () => {

  libros.items.forEach(async (el) => {
    const createBook = await Books.create({
      title: el.title,
      authors: el.authors.join(),
      publisher: el.publisher,
      ISBN: el.ISBN,
      imageLinks: el.imageLinks,
      description: el.description,
      stock:Math.floor((Math.random()*(20-2))+2),
      price: el.price
    });

    const typeofBooks = await Categories.findAll({ where: { name: el.categories } });
    //console.log(typeofBooks.JSON())
    createBook.addCategories(typeofBooks);
  })

}
const allBooks = async () => {

  return await Books.findAll({ include });
}

const shopControllers = {

  fetchAllBooks: async (req, res, next) => {
    try {

      const books = await allBooks();
      return res.status(200).json(books);
    } catch (err) {
      const error = new HttpError("No hay libros en el inventario", 404);
      return next(error);
    }
  },
  joinFilterByTitleAndAuthor: async (req, res, next) => {
    const { value } = req.query;
    try {
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!value) throw new HttpError("Debe enviar un Valor", 400);
      const booksFilter = await Books.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${value}%`
              }
            },
            {
              authors: {
                [Op.iLike]: `%${value}%`
              }
            }
          ]
        },
        include
      });
      if (!booksFilter.length) throw new HttpError("No hay libros con ese criterio de búsqueda", 404);
      return res.send(booksFilter);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del ervidor", 500);
      }
      return next(error);
    }
  },
  filterBooksByTitle: async (req, res, next) => {
    const { title } = req.query;
    try {
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!title) throw new HttpError("Debe enviar un título", 400);
      const booksFilter = await Books.findAll({
        where: {
          title: {
            [Op.iLike]: `%${author}%`
          }
        },
        include
      });
      if (!booksFilter.length) throw new HttpError("El author no existe", 404);
      return res.status(200).json(booksFilter);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del ervidor", 500);
      }
      return next(error);
    }
  },
  filterBooksByAuthor: async (req, res, next) => {
    const { author } = req.query;
    try {
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!author) throw new HttpError("Debe enviar un author", 400);
      const authorsFound = await Books.findAll({
        where: {
          authors: {
            [Op.iLike]: `%${author}%`
          }
        },
        include
      });
      if (!authorsFound.length) throw new HttpError("El author no existe", 404);
      return res.status(200).json(authorsFound);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del ervidor", 500);
      }
      return next(error);
    }
  },
  orderBooksByAlphabetically: async (req, res, next) => {
    const { type } = req.query;
    try {
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!type || (type !== "asc" && type !== "desc")) throw new HttpError("Enviar un tipo de ordenamiento", 400);
      let sort = type === "asc" ? "ASC" : "DESC";
      const orderByTitle = await Books.findAll({
        order: [
          ["title", sort]
        ],
        include
      });
      return res.send(orderByTitle);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del servidor", 500);
      }
      return next(error);
    }
  },
  getBookById: async (req, res, next) => {
    let id = req.params.idBook;
    try {
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!uuid.validate(id)) throw new HttpError("Formato de id no válido", 400);
      const book = await Books.findByPk(id, { include });
      if (!book) throw new HttpError("El libro no existe", 400);
      res.status(200).json(book);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del servidor", 500);
      }
      return next(error);
    }
  },
  orderBooksPrice: async (req, res, next) => {
    try {
      const { type } = req.query;
      if (!await lengthBooks()) throw new HttpError("No hay libros en el inventario", 404);
      if (!type || (type !== "asc" && type !== "desc")) throw new HttpError("Enviar un tipo de ordenamiento", 400);
      const books = await allBooks();
      if (type === "asc") books.sort((a, b) => a.price - b.price);
      else if (type === "desc") books.sort((a, b) => b.price - a.price);
      return res.status(200).json(books);
    } catch (error) {
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error interno del servidor", 500);
      }
      return next(error);
    }
  },
  fetchAllCategories: async (req, res) => {
    //   try {

    //      await dataCategory.categories.forEach((el) => Categories.findOrCreate({ where: { name: el.name } }));
    //  // console.log(res)
    //     return Categories.findAll()
    //   } catch (error) {
    //     return res.status(400).send(error)
    //   }


    try {
      let categories = await Categories.findAll()

      if (!categories.length) {
        await bookscargados()
        //buscar api
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

      }
      return res.json(categories)

    } catch (e) {
      res.redirect('/error')
    }


  },
  booksByCategory: async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) throw "Debe ingresar la categoria"
      const books = await allBooks();
      const booksCategory = books.filter(el => el.categories.map(ele => ele.name.toUpperCase()).includes(name.toUpperCase()));
      if (!booksCategory.length) throw "No se encontraron libros en esta categoria"
      return res.status(200).json(booksCategory);
    } catch (error) {
      return res.status(400).send(error);
    }

  }
};

module.exports = shopControllers;
