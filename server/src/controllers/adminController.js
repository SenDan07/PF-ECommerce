const libros = require('../../data/dataBook.json');

const adminControler = {
  createBook: (req, res) => {
    try {
      let tam = libros.items.length;
      libros.items = [...libros.items, {id: tam+1, ...req.body}];
      res.status(201).send("El libro fue creado correctamente");
    } catch (error) {
      res.status(400).send(error);
    }
  },
}

module.exports = adminControler