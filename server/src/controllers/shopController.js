const libros = require('../../data/dataBook.json');

const shopController = {
  filterBooksByAuthor: (req, res) => {
    try {
      const { author } = req.query;
      if (!author) throw "Debe enviar un author";
      const authorsFound = libros.filter(el => el.author.toUpperCase().includes(author.toUpperCase()));
      if (authorsFound.length < 1) throw "El author no existe";
      return res.status(200).json(authorsFound);
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  orderBooksByAlphabetically: (req, res) => {
    const { type } = req.query;
    try {
      if (!type) throw "Debe enviar una opción";
      const orderByName = (type === 'asc') ? libros.items?.sort((prev, current) => prev.title.localeCompare(current.title)) : libros.items?.sort((prev, current) => current.title.localeCompare(prev.title));
      if (!orderByName.length) throw "No existen libros";
      return res.send(orderByName);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
}


module.exports = shopController