const HttpError = require("../models/http-error");
const libros = require("../../data/dataBook.json");

const adminControllers = {
  createBook: (req, res, next) => {
    try {
      let tam = libros.items.length;
      libros.items = [...libros.items, { id: tam + 1, ...req.body }];
      res.status(201).send("El libro fue creado correctamente");
    } catch (err) {
      const error = HttpError(
        `No se pudo crear el libro, intente nuevamente más tarde${console.log(
          err
        )}`,
        500
      );
      return next(error);
    }
  },
};

module.exports = adminControllers;
